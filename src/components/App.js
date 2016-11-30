import CongressMen from './congressman/congressmen'
import FilterBar from './filterbar'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      republicansOnly: false
    }

    this.handleUserInput = this.handleUserInput.bind(this);
  }

  handleUserInput(republicansOnly) {
    debugger;
    this.setState({
      republicansOnly: republicansOnly
    });
  }

  render() {
    return (
      <div>
      <FilterBar 
        republicansOnly={this.state.republicansOnly}
        onUserInput={this.handleUserInput} 
      />
      <CongressMen republicansOnly={this.state.republicansOnly} /> 
      </div>
    )
  }
}

export default App
