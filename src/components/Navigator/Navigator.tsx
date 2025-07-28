import { useLocation } from 'preact-iso'
import { useState } from 'preact/hooks';
import { MdConstruction, MdMenu, MdPublic } from 'react-icons/md'

import './Navigator.css'

export function Navigator() {
    const [ style, setStyle ] = useState("navigator");
    const [ extended, setExtended ] = useState(false);
    const location = useLocation();

    function navigatorClicked() {
        setStyle(`navigator navigator-${extended ? "collapsed" : "extended"}`);
        setExtended(!extended);
    }

    return (
        <div class={style}>
            <button class={"navigator-button"}>bk</button>
            <button class={"navigator-button"} onClick={() => location.route('/ft/links')}><MdPublic/></button>
            <button class={"navigator-button"} onClick={() => location.route('/ft/under-construction')}><MdConstruction/></button>
            <button class={"navigator-button"} onClick={() => navigatorClicked()}><MdMenu/></button>
        </div>
    )
}