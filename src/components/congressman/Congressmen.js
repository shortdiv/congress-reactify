import CongressMan from './Congressman'

class CongressMen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <CongressMan id="A000360" />
        <CongressMan id="W000805" />
      </div>
    );
  }
}

export default CongressMen
