class FilterBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.props.onUserInput(
      this.republicansOnly.checked
    )
  }

  render() {
    return (
      <form>
        <p>
          <input 
            type="checkbox" 
            checked={this.props.republicansOnly} 
            ref={(input) => this.republicansOnly = input}
            onChange={this.handleChange}
          />
          Republicans
        </p>
      </form>
    )
  }
}

export default FilterBar 
