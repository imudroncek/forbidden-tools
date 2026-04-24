import { Component, VNode } from 'preact';
import { NavigatorButton, NavigatorButtonSize } from '../Button/NavigatorButton';

import './NavigatorSlot.css'

interface Props {
    size: NavigatorButtonSize;
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

    getSeparator(hide: boolean){
        if (!hide && this.props.type === NavigatorSlotType.EXTRA && this.state.children.length > 0) {
            return (<div class={`separator separator-${this.props.size === NavigatorButtonSize.SMALL ? 'small' : 'large'}`}></div>);
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
                <div class={`slot slot-${this.props.size == NavigatorButtonSize.SMALL ? 'small' : 'large'}`}>
                    {this.state.children}
                </div>
            )
        } else {
            return (
                <div class={`slot slot-${this.props.size == NavigatorButtonSize.SMALL ? 'small' : 'large'}`}>
                    {this.getSeparator(this.props.size == NavigatorButtonSize.SMALL)}
                    {this.state.children}
                    {this.getSeparator(this.props.size == NavigatorButtonSize.LARGE)}
                </div>
            )
        }
    }
}