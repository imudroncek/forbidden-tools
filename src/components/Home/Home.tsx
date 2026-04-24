import { Component } from 'preact';
import './Home.css';

interface Props {
  message: string;
}

export class Home extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div class={"home background-blur rakkas-regular"}>
        <div class={"title"}>
          <div class={"date-agnostic"}>
              <p>Forbidden</p>
              <p>Tools</p>
          </div>
          <div class={"date-specific"}>
            <p>{this.props.message}</p>
          </div>
        </div>
      </div>
    )
  }
}