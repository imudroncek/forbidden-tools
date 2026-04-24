import { Component, VNode } from 'preact';
import { NavigatorButton } from '../Button/NavigatorButton';

import './NavigatorSlot.css'

interface Props {
    type: NavigatorSlotType;
    children?: VNode<NavigatorButton>[];
}

interface State {
    children: VNode<NavigatorButton>[];
}

export enum NavigatorSlotType {
    MAIN,
    EXTRA
}

export class NavigatorSlot extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            children: props.children === undefined ? [] : props.children
        }
    }

    getSeparator(){
        if (this.props.type === NavigatorSlotType.EXTRA && this.state.children.length > 0) {
            return (<div class={"separator"}></div>);
        }
    } 

    addChild(child: VNode<NavigatorButton>) {
        if (this.props.type === NavigatorSlotType.EXTRA) {
            const newChildren = this.state.children;
            newChildren.push(child);
            this.setState({
                children: newChildren
            });
        }
    }

    removeChildren() {
        if (this.props.type === NavigatorSlotType.EXTRA) {
           this.setState({
                children: []
            });
        }
    }

    render() {
        if (this.props.type === NavigatorSlotType.MAIN) {
            return (
                <div>
                    {this.state.children}
                </div>
            )
        } else {
            return (
                <div>
                    {this.state.children}
                    {this.getSeparator()}
                </div>
            )
        }
    }
}