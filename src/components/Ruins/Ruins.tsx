import './Ruins.css'

import { MdCastle } from 'react-icons/md'
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
                const roll = this.roll(section.dice);
                section.data.forEach((data: RuinsData) => {
                    if (data.roll.from <= roll && data.roll.to >= roll) {
                        result.detail = data.info === null ? "" : data.info;
                        if (data.additionalRoll !== null) {
                            console.log("Sub roll required.");
                        }
                    }
                });
                console.log(result);
                results.push(result);
            } else if (section.type === ROLL_TYPE.SUB) {
                console.debug("Skipping sub roll.");
            } else {
                throw(`Unexpected roll type [${section.type}].`);
            }
        });
        this.setState({result: results});
    }

    async fetchRuinsFile() {
        const url = "https://raw.githubusercontent.com/imudroncek/forbidden-tools/refs/heads/master/external/ruins.json";
        const response = await fetch(url);
        if (response.ok) {
            return await response.json();
        }
    }

    private roll(dice: string) {
        if (dice === DICE_TYPE.D66) {
            return this.rollD66();
        } else if (dice === DICE_TYPE.D6) {
            return this.rollD6();
        } else {
            throw(`Unexpected dice type [${dice}].`);
        }
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
                <div class={"text"}>
                    <h1><MdCastle/></h1>
                    <button onClick={() => this.generateRuin()}>Generate Ruin</button>
                    <p>Generate Ruin</p>
                </div>
            </div>
        );
    }
}
