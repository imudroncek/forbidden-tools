import { MdPublic, MdOpenInNew } from 'react-icons/md'

import './Links.css'

export function Links() {
  return (
    <div class={"links bellefair-regular"}>
      <div class={"text"}>
        <h1><MdPublic/></h1>
        <div class={"external"}><a href={"https://freeleaguepublishing.com/shop/forbidden-lands/"}>Buy Forbidden Lands TTRPG </a><MdOpenInNew/></div>
        <div class={"external"}><a href={"https://github.com/imudroncek/forbidden-tools"}>Forbidden Tools GitHub </a><MdOpenInNew/></div>
      </div>
    </div>
  )
}