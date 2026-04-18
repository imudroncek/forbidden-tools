import { getDateSpecificBackground, Holiday } from '../../common/common';
import { Component } from 'preact';
import './Background.css';

interface Props {}

interface State {
    background: string;
}

export class Background extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            background: getDateSpecificBackground()
        };
    }

    forceHoliday (holiday: Holiday): void {
        this.setState({background: holiday});
    }

    render () {
        return (
            <div class={"background-display"}>
                <div class={`background background-${this.state.background}`}></div>
            </div>
        );
    }
}