import { getDateSpecificBackground } from '../../common/common';
import './Background.css';

export function Background() {
    return (
        <div class={"background-display"}>
            <div class={`background background-${getDateSpecificBackground()}`}></div>
        </div>
    );
}