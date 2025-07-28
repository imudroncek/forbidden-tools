import { MdConstruction } from 'react-icons/md'

import './UnderConstruction.css'

export function UnderConstruction() {
  return (
    <div class={"construction bellefair-regular"}>
      <div class={"text"}>
        <h1><MdConstruction/></h1>
        <p>Under Construction</p>
      </div>
    </div>
  )
}