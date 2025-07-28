import { MdAutoFixHigh } from 'react-icons/md'

import './ProgressOverlay.css'

type Props = {
    visible: Boolean;
}

export function ProgressOverlay(props: Props) {
  return (
    <div hidden={!props.visible} class={"overlay bellefair-regular"}>
      <div class={"text"}>
        <h1><MdAutoFixHigh/></h1>
        <p>Conjuring</p>
      </div>
    </div>
  )
}