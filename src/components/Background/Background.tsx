import { getDateSpecificObject, Holiday } from '../../common/common';
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
            background: getDateSpecificObject().holiday
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