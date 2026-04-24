import './NavigatorButton.css';
import { Component, JSX } from 'preact';

interface Props {
    hidden?: boolean;
    size: NavigatorButtonSize;
    onClick?: () => void;
    children: JSX.Element | string;
}

interface State {
    hidden: boolean;
}

export enum NavigatorButtonSize {
    SMALL = 'navigator-button-small',
    LARGE = 'navigator-button-large'
}

export class NavigatorButton extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hidden: !!props.hidden
        }
    }

    switch() {
        const hidden = this.state.hidden;
        this.setState({
            hidden: !hidden
        });
    }

    render() {
        return (
            <button hidden={this.state.hidden} class={`navigator-button ${this.props.size}`} onClick={this.props.onClick}>{this.props.children}</button>
        )
    }
}