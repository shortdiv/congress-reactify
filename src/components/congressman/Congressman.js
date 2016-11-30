import ReactDOM from 'react-dom'
import 'whatwg-fetch'

class CongressMan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      party: '',
      seniority: '',
    }
  }

  componentDidMount() {
    this.setState({
      firstName: this.props.info.first_name,
      lastName: this.props.info.last_name,
      party: this.props.info.party,
      seniority: this.props.info.seniority,
      imageURL: 'https://www.congress.gov/img/member/' + this.props.info.id.toLowerCase() + '.jpg',
    })
  }

  componentWillUnmount() {
    console.log('unmount!')
  }

  render() {
    return (
      <div className='congressMan'>
      <a href="" className="tag">
        <figure>
          <img src={this.state.imageURL} />
          <figcaption></figcaption>
        </figure>
        <div className="stats">
          <p>{this.state.firstName} {this.state.lastName}</p>
          <p>Party: {this.state.party}</p>
          <p>Seniority: {this.state.seniority}</p>
        </div>
      </a>
      </div>
    );
  }
}

export default CongressMan
