import './Home.css';
import { getDateSpecificMessage } from '../../common/common';

export function Home() {


  return (
    <div class={"home background-blur rakkas-regular"}>
      <div class={"title"}>
        <div class={"date-agnostic"}>
            <p>Forbidden</p>
            <p>Tools</p>
        </div>
        <div class={"date-specific"}>
          <p>{getDateSpecificMessage()}</p>
        </div>
      </div>
    </div>
  )
}