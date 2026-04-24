import './Ruins.css'

import { MdCastle, MdClear, MdReplay } from 'react-icons/md'
import { ProgressOverlay } from '../ProgressOverlay/ProgressOverlay';
import { Component, Context, JSX, RefObject, VNode } from 'preact';
import { NavigatorContext } from '../Navigator/Context/NavigatorContext';
import { Navigator } from '../Navigator/Navigator';
import { NavigatorButton, NavigatorButtonSize } from '../Navigator/Button/NavigatorButton';

const DICE_TYPE = {
    D66: "D66",
    D6: "D6"
}

const ROLL_TYPE = {
    MAIN: "MAIN",
    SUB: "SUB"
}

type AdditionalRoll = {
    number: number;
    id: number;
}

type RuinsData = { 
    roll: { 
        from: number; 
        to: number; 
    }; 
    info: string; 
    additionalRoll: AdditionalRoll | null; 
}

type RuinsSection = { 
    id: number;
    type: string;
    description: string; 
    dice: string; 
    data: RuinsData[]
}

type RuinsResult = {
    title: string;
    detail: string[];
}

interface Props {}

interface State {
    overlay: boolean;
    ruins: RuinsSection[];
    fetching: boolean;
    result: RuinsResult[];
}

export class Ruins extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            overlay: false,
            ruins: [],
            fetching: false,
            result: []
        }
    }

    static contextType = NavigatorContext;

    async componentDidMount(): Promise<void> {
        this.setState({fetching: true});
        try {
            const ruins = await this.fetchRuinsFile(); 
            this.setState({ruins: ruins});
        } catch (error) {
            console.error(error);
        } finally {
            this.setState({fetching: false});
        }
    }

    delay(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    discardRuin() {
        this.setState({result: []});
        this.removeExtraButtons();
    }

    removeExtraButtons() {
        const smallNavigator: Navigator = this.context.small.current;
        const largeNavigator: Navigator = this.context.large.current;
        smallNavigator?.removeChildren();
        largeNavigator?.removeChildren();
    }

    addExtraButtons() {
        const smallNavigator: Navigator = this.context.small.current;
        const largeNavigator: Navigator = this.context.large.current;
        smallNavigator?.addChild(<NavigatorButton size={NavigatorButtonSize.SMALL} onClick={() => this.discardRuin()}><MdClear/></NavigatorButton>);
        smallNavigator?.addChild(<NavigatorButton size={NavigatorButtonSize.SMALL} onClick={() => this.reGenerateRuin()}><MdReplay/></NavigatorButton>);
        largeNavigator?.addChild(<NavigatorButton size={NavigatorButtonSize.LARGE} onClick={() => this.reGenerateRuin()}><MdReplay/></NavigatorButton>);
        largeNavigator?.addChild(<NavigatorButton size={NavigatorButtonSize.LARGE} onClick={() => this.discardRuin()}><MdClear/></NavigatorButton>);
    }

    async reGenerateRuin() {
        this.removeExtraButtons();
        await this.generateRuin();
    }

    async generateRuin() {
        this.setState({overlay: true});
        try {
            if (this.state.ruins.length > 0) {
                this.processRuins();
            } else {
                let retries = 10;
                while (retries > 0 && this.state.fetching) {
                    retries--;
                    await this.delay(5000);
                }
                if (this.state.ruins.length > 0) {
                    this.processRuins();
                } else {
                    console.error("Could not fetch ruins file.");
                    this.setState({fetching: false});
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            await this.delay(5000);
            this.setState({overlay: false});
            if (this.state.result.length > 0) {
                this.addExtraButtons();
            }
        }
    }

    processRuins() {
        const results: RuinsResult[] = [];
        this.state.ruins.forEach((section: RuinsSection) => {
            if (section.type === ROLL_TYPE.MAIN) {
                let result: RuinsResult = {
                    title: section.description === null ? "" : section.description,
                    detail: []
                }
                const roll = this.roll(1, section.dice);
                section.data.forEach((data: RuinsData) => {
                    if (data.roll.from <= roll && data.roll.to >= roll) {
                        if (data.info !== null) {
                            result.detail.push(data.info);
                        }
                        if (data.additionalRoll !== null && section.id !== 5) {
                            this.processSubRoll(result, {
                                id: data.additionalRoll.id,
                                number: data.additionalRoll.number
                            }, false);
                        } else if (section.id === 5) {
                            results.push(result);
                            this.processBuildings(data, results);
                        }
                    }
                });
                if (section.id !== 5) {
                    results.push(result);
                }
            } else if (section.type === ROLL_TYPE.SUB) {
                console.debug("Skipping sub roll.");
            } else {
                throw(`Unexpected roll type [${section.type}].`);
            }
        });
        this.setState({result: results});
    }

    private processBuildings(data: RuinsData, results: RuinsResult[]) {
        if (data.additionalRoll !== null) {
            const numberOfBuildings = this.getNumberOfBuildings(data.additionalRoll.number);
            for (let i = 0; i < numberOfBuildings; i++) {
                let result: RuinsResult = {
                    title: `Building ${i + 1}`,
                    detail: []
                }
                this.processSubRoll(result, {number: 1, id: 6}, false);
                this.processSubRoll(result, {number: 1, id: 7}, true);
                this.processSubRoll(result, {number: 1, id: 8}, true);
                results.push(result);
            }
        }
    }

    private getNumberOfBuildings(number: number) {
        return this.roll(number, DICE_TYPE.D6);
    }

    private processSubRoll(result: RuinsResult, additionalRoll: AdditionalRoll, addDescriptions: boolean) {
        this.state.ruins.forEach(section => {
            if (section.id === additionalRoll.id) {
                for (let i = 0; i < additionalRoll.number; i++) {
                    const roll = this.roll(1, section.dice);
                    section.data.forEach((data: RuinsData) => {
                        if (data.roll.from <= roll && data.roll.to >= roll) {
                            if (data.info !== null) {
                                addDescriptions ? result.detail.push(`${section.description}: ${data.info}`) : result.detail.push(data.info);
                            }
                            if (data.additionalRoll !== null) {
                                this.processSubRoll(result, data.additionalRoll, addDescriptions);
                            }
                        }
                    });
                }
            }
        });
    }

    async fetchRuinsFile() {
        const url = "https://raw.githubusercontent.com/imudroncek/forbidden-tools/refs/heads/master/external/ruins.json";
        const response = await fetch(url);
        if (response.ok) {
            return await response.json();
        }
    }

    private roll(number: number, dice: string) {
        let count = 0;
        for (let i = 0; i < number; i++) {
            if (dice === DICE_TYPE.D66) {
                count += this.rollD66();
            } else if (dice === DICE_TYPE.D6) {
                count += this.rollD6();
            } else {
                throw(`Unexpected dice type [${dice}].`);
            }
        }
        return count;
    }

    private rollD66() {
        const A = Math.floor(Math.random() * 6) + 1;
        const B = Math.floor(Math.random() * 6) + 1;
        return (A * 10) + B;
    }

    private rollD6() {
        return Math.floor(Math.random() * 6) + 1;
    }

    private getDetail(result: RuinsResult) {
        let out = [<h3>{result?.title}</h3>];
        result?.detail.forEach(detail => {
            out.push(
                <p>{detail}</p>
            );
        });
        out.push(<div class={"small-spacer"}></div>);
        return out;
    }

    private getResults(): JSX.Element[] {
        let out: JSX.Element[] = [];
        for (let i = 0; i < this.state.result.length; i++) {
            out.push(
                    <div class={"result"}>
                        {this.getDetail(this.state.result[i])}
                    </div>
            );
        }
        return out;
    }

    render() {console.log(this.context);
        return (
            <div class={"ruins background-blur bellefair-regular"}>
                <ProgressOverlay visible={this.state.overlay} />
                <div hidden={this.state.result.length > 0} class={"text"}>
                    <h1><MdCastle/></h1>
                    <button class={"generate-button bellefair-regular"} onClick={() => this.generateRuin()}>Generate Ruin</button>
                </div>
                <div hidden={this.state.result.length === 0 || this.state.overlay} class={"scrollable"}>
                    <div class={"large-spacer"} />
                    {this.getResults()}
                    <div class={"large-spacer"} />
                </div>
            </div>
        );
    }
}
