import { DateSpecificObject, getDateSpecificObject, getNextHoliday } from '../../../common/common';
import { Component } from 'preact';
import { NavigatorContext } from '../../Navigator/Context/NavigatorContext';
import { NavigatorButton, NavigatorButtonSize } from '../../Navigator/Button/NavigatorButton';
import { MdReplay } from 'react-icons/md';
import { Navigator } from '../../Navigator/Navigator';
import { Background } from '../Background';

import './BackgroundSwitcher.css';

interface Props {
    switchBackground: (background: DateSpecificObject) => void;
}

interface State {
    background: DateSpecificObject;
    extraButton: boolean;
}

export class BackgroundSwitcher extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            background: getDateSpecificObject(),
            extraButton: false
        };
    }
    
    static contextType = NavigatorContext;

    async componentDidMount(): Promise<void> {
        this.addExtraButton();
    }

    async componentWillUnmount(): Promise<void> {
        this.removeExtraButtons();
    }

    forceNextHoliday(): void {
        const nextHoliday = getNextHoliday(this.state.background);
        this.setState({background: nextHoliday});
        this.props.switchBackground(nextHoliday);
    }
    
    addExtraButton() {
        const smallNavigator: Navigator = this.context.small.current;
        const largeNavigator: Navigator = this.context.large.current;
        if (!this.state.extraButton) {
            smallNavigator?.addChild(<NavigatorButton size={NavigatorButtonSize.SMALL} onClick={() => this.forceNextHoliday()}><MdReplay/></NavigatorButton>);
            largeNavigator?.addChild(<NavigatorButton size={NavigatorButtonSize.LARGE} onClick={() => this.forceNextHoliday()}><MdReplay/></NavigatorButton>);
            this.setState({extraButton: true});
        }
    }

    removeExtraButtons() {
        const smallNavigator: Navigator = this.context.small.current;
        const largeNavigator: Navigator = this.context.large.current;
        smallNavigator?.removeChildren();
        largeNavigator?.removeChildren();
        this.setState({extraButton: false});
    }

    render () {
        return <Background image={this.state.background.holiday} />
    }
}