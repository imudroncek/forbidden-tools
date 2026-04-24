import { Component } from 'preact';
import './Background.css';

interface Props {
    image: string;
}

export class Background extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render () {
        return (
            <div class={"background-display"}>
                <div class={`background background-${this.props.image}`}></div>
            </div>
        );
    }
}