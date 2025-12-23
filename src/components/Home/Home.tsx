import './Home.css';
import { isChristmas } from '../../common/common';

export function Home() {
  const getDateSpecificMessage = () => {
    if (isChristmas()) {
      return "Christmas Edition";
    }

    return "";
  }

  return (
    <div class={"home rakkas-regular"}>
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