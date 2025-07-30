import { useLocation } from 'preact-iso'
import { useState } from 'preact/hooks';
import { MdConstruction, MdChevronRight, MdChevronLeft, MdPublic, MdCastle } from 'react-icons/md'

import './Navigator.css'

export function Navigator() {
    const [ style, setStyle ] = useState("navigator navigator-small");
    const [ extended, setExtended ] = useState(false);
    const location = useLocation();

    function navigatorClicked() {
        setStyle(`navigator navigator-small navigator-${extended ? "collapsed" : "extended"}`);
        setExtended(!extended);
    }

    return (
        <div>
            <div class={style}>
                <button class={"navigator-button"}>bk</button>
                <button class={"navigator-button"} onClick={() => location.route('/ft/links')}><MdPublic/></button>
                <button class={"navigator-button"} onClick={() => location.route('/ft/under-construction')}><MdConstruction/></button>
                <button class={"navigator-button"} onClick={() => location.route('/ft/ruins')}><MdCastle/></button>
                <button hidden={extended} class={"navigator-button"} onClick={() => navigatorClicked()}><MdChevronRight/></button>
                <button hidden={!extended} class={"navigator-button"} onClick={() => navigatorClicked()}><MdChevronLeft/></button>
            </div>
            <div class={"navigator navigator-large"}>
                <button class={"navigator-button"}>bk</button>
                <button class={"navigator-button"} onClick={() => location.route('/ft/links')}><MdPublic/></button>
                <button class={"navigator-button"} onClick={() => location.route('/ft/under-construction')}><MdConstruction/></button>
                <button class={"navigator-button"} onClick={() => location.route('/ft/ruins')}><MdCastle/></button>
            </div>
        </div>
    )
}