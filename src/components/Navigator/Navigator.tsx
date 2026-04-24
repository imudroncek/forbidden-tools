import { LocationProvider } from 'preact-iso';
import { Component, createRef, RefObject, VNode } from 'preact';
import { MdConstruction, MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown, MdPublic, MdCastle, MdImage } from 'react-icons/md';
import { NavigatorButton, NavigatorButtonSize } from './Button/NavigatorButton';
import { NavigatorSlot, NavigatorSlotType } from './Slot/NavigatorSlot';

import './Navigator.css'

interface Props {
    size: NavigatorSize;
}

interface State {
    style: string;
    extended: boolean;
}

export interface NavigatorInterface {
    small: RefObject<Navigator>, 
    large: RefObject<Navigator>
}

export enum NavigatorSize {
    SMALL,
    LARGE
}

const defaultStyle = "navigator navigator-small";

export class Navigator extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            style: defaultStyle,
            extended: false
        }
    }
    
    static contextType = LocationProvider.ctx;

    mainRef = createRef<NavigatorSlot>();
    extraRef = createRef<NavigatorSlot>();
    collapseButton = createRef<NavigatorButton>();
    extendButton = createRef<NavigatorButton>();

    addChild(child: VNode<NavigatorButton>) {
        this.extraRef.current?.addChild(child);
    }

    removeChildren() {
        this.extraRef.current?.removeChildren();
    }

    arrowClicked() {
        const extended = this.state.extended;
        this.setState({
            style: `${defaultStyle} navigator-${extended ? "collapsed" : "extended"}`,
            extended: !extended
        });
        this.collapseButton.current?.switch();
        this.extendButton.current?.switch();
    }

    navigateTo(path: string) {
        const location = this.context;
        if (path !== location.path) {
            this.removeChildren();
            location.route(path);
        }
    }

    getNavigator() {
        if (this.props.size === NavigatorSize.SMALL) {
            return (
                <div class={this.state.style} >
                    <NavigatorSlot size={NavigatorButtonSize.SMALL} type={NavigatorSlotType.EXTRA} ref={this.extraRef} />
                    <NavigatorSlot size={NavigatorButtonSize.SMALL} type={NavigatorSlotType.MAIN} ref={this.mainRef} >
                        <NavigatorButton ref={this.collapseButton} hidden={!this.state.extended} size={NavigatorButtonSize.SMALL} onClick={() => this.arrowClicked()}><MdOutlineKeyboardArrowDown/></NavigatorButton>
                        <NavigatorButton ref={this.extendButton} hidden={this.state.extended} size={NavigatorButtonSize.SMALL} onClick={() => this.arrowClicked()}><MdOutlineKeyboardArrowUp/></NavigatorButton>
                        <NavigatorButton size={NavigatorButtonSize.SMALL} onClick={() => this.navigateTo('/ft/ruins')}><MdCastle/></NavigatorButton>
                        <NavigatorButton size={NavigatorButtonSize.SMALL} onClick={() => this.navigateTo('/ft/under-construction')}><MdConstruction/></NavigatorButton>
                        <NavigatorButton size={NavigatorButtonSize.SMALL} onClick={() => this.navigateTo('/ft/links')}><MdPublic/></NavigatorButton>
                        <NavigatorButton size={NavigatorButtonSize.SMALL} onClick={() => this.navigateTo('/ft/background')}><MdImage/></NavigatorButton>
                        <NavigatorButton size={NavigatorButtonSize.SMALL}>bk</NavigatorButton>
                    </NavigatorSlot>
                </div>      
            )
        } else {
            return (
                <div class={"navigator navigator-large"}>
                    <NavigatorSlot size={NavigatorButtonSize.LARGE} type={NavigatorSlotType.MAIN} ref={this.mainRef} >
                        <NavigatorButton size={NavigatorButtonSize.LARGE}>bk</NavigatorButton>
                        <NavigatorButton size={NavigatorButtonSize.LARGE} onClick={() => this.navigateTo('/ft/background')}><MdImage/></NavigatorButton>
                        <NavigatorButton size={NavigatorButtonSize.LARGE} onClick={() => this.navigateTo('/ft/links')}><MdPublic/></NavigatorButton>
                        <NavigatorButton size={NavigatorButtonSize.LARGE} onClick={() => this.navigateTo('/ft/under-construction')}><MdConstruction/></NavigatorButton>
                        <NavigatorButton size={NavigatorButtonSize.LARGE} onClick={() => this.navigateTo('/ft/ruins')}><MdCastle/></NavigatorButton>
                    </NavigatorSlot>
                    <NavigatorSlot size={NavigatorButtonSize.LARGE} type={NavigatorSlotType.EXTRA} ref={this.extraRef} />
                </div>
            )
        }
    }

    render() { 
        return this.getNavigator();
    }
}