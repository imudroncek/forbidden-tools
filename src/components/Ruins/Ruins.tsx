import './Ruins.css'

import { MdCastle, MdClear, MdReplay } from 'react-icons/md'
import { ProgressOverlay } from '../ProgressOverlay/ProgressOverlay';
import { Component } from 'preact';

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
    detail: string | undefined;
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
        }
    }

    processRuins() {
        const results: RuinsResult[] = [];
        this.state.ruins.forEach((section: RuinsSection) => {
            if (section.type === ROLL_TYPE.MAIN) {
                let result: RuinsResult = {
                    title: section.description === null ? "" : section.description,
                    detail: ""
                }
                const roll = this.roll(1, section.dice);
                section.data.forEach((data: RuinsData) => {
                    if (data.roll.from <= roll && data.roll.to >= roll) {
                        result.detail = data.info === null ? "" : data.info;
                        if (data.additionalRoll !== null) {
                            this.processSubRoll(result, {
                                id: data.additionalRoll.id,
                                number: data.additionalRoll.id === 6 ? this.getNumberOfBuildings(data.additionalRoll.number) : data.additionalRoll.number
                            });
                        }
                    }
                });
                results.push(result);
            } else if (section.type === ROLL_TYPE.SUB) {
                console.debug("Skipping sub roll.");
            } else {
                throw(`Unexpected roll type [${section.type}].`);
            }
        });
        this.setState({result: results});
    }

    private getNumberOfBuildings(number: number) {
        return this.roll(number, DICE_TYPE.D6);
    }

    private processSubRoll(result: RuinsResult, additionalRoll: AdditionalRoll) {
        this.state.ruins.forEach(section => {
            if (section.id === additionalRoll.id) {
                for (let i = 0; i < additionalRoll.number; i++) {
                    const roll = this.roll(1, section.dice);
                    section.data.forEach((data: RuinsData) => {
                        if (data.roll.from <= roll && data.roll.to >= roll) {
                            result.detail += " - ";
                            result.detail += data.info === null ? "" : data.info;
                            if (data.additionalRoll !== null) {
                                this.processSubRoll(result, data.additionalRoll);
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

    render() {
        return (
            <div class={"ruins bellefair-regular"}>
                <ProgressOverlay visible={this.state.overlay} />
                <div hidden={this.state.result.length > 0} class={"text"}>
                    <h1><MdCastle/></h1>
                    <button class={"generate-button bellefair-regular"} onClick={() => this.generateRuin()}>Generate Ruin</button>
                </div>
                <div hidden={this.state.result.length === 0 || this.state.overlay} class={"scrollable"}>
                    <div hidden={this.state.overlay} class={"toolbar"}>
                        <button class={"toolbar-button"} onClick={() => this.setState({result: []})}><MdClear/></button>
                        <button class={"toolbar-button"} onClick={() => this.generateRuin()}><MdReplay/></button>
                        <button class={"toolbar-button"}>bk</button>
                    </div>
                    <div class={"spacer"} />
                    <div class={"result"}>
                        <h3>{this.state.result[0]?.title}</h3>
                        <p>{this.state.result[0]?.detail}</p>
                    </div>
                    <div class={"result"}>
                        <h3>{this.state.result[1]?.title}</h3>
                        <p>{this.state.result[1]?.detail}</p>
                    </div>
                    <div class={"result"}>
                        <h3>{this.state.result[2]?.title}</h3>
                        <p>{this.state.result[2]?.detail}</p>
                    </div>
                    <div class={"result"}>
                        <h3>{this.state.result[3]?.title}</h3>
                        <p>{this.state.result[3]?.detail}</p>
                    </div>
                    <div class={"result"}>
                        <h3>{this.state.result[4]?.title}</h3>
                        <p>{this.state.result[4]?.detail}</p>
                    </div>
                    <div class={"result"}>
                        <h3>{this.state.result[5]?.title}</h3>
                        <p>{this.state.result[5]?.detail}</p>
                    </div>
                    <div class={"result"}>
                        <h3>{this.state.result[6]?.title}</h3>
                        <p>{this.state.result[6]?.detail}</p>
                    </div>
                    <div class={"spacer"} />
                </div>
            </div>
        );
    }
}
