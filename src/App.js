import config from './config.json'
import styles from './style.css'

class CongressMan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      party: '',
      startDate: '',
      endDate: '',
      partyAffiliation: '',
      currentRole: '',
      imageURL: 'https://www.congress.gov/img/member/'
    }
  }

  componentDidMount() {
    this.serverRequest = new XMLHttpRequest();
    this.serverRequest.open('GET', 'https://api.propublica.org/congress/v1/members/' + this.props.id + '.json', false);
    this.serverRequest.setRequestHeader("X-API-Key", __CONGRESS__);
    this.serverRequest.send()
    if(this.serverRequest.status === 200) {
      var data = JSON.parse(this.serverRequest.responseText).results[0],
          dates = this._getDates(data.roles);

      this.data = data;

      this.setState({
        firstName: data.first_name,
        lastName: data.last_name,
        partyAffiliation: this._printPartyName(data.current_party),
        imageURL: this.state.imageURL + this.props.id.toLowerCase() + '.jpg',
        startDate: dates[0],
        endDate: dates[dates.length - 1],
        currentRole: data.roles[0].congress + "th " + data.roles[0].chamber
      })
    }
  }
  componentWillUnmount() {
    this.serverRequest.abort();
  }
  _getDates(roles) {
    var dates = [];
    roles.map(function(role) {
      dates.push(role.start_date);
      dates.push(role.end_date);
    })
    dates.sort();
    return dates;
  }
  _printPartyName(partyChar) {
    return partyChar === 'R' ? 'Republican' : 'Democrat'
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
          <p>Party: {this.state.partyAffiliation}</p>
          <p>Currently Serving: {this.state.currentRole}</p>
          <p> Years of Service: {this.state.startDate} - {this.state.endDate}</p>
        </div>
      </a>
      </div>
    );
  }
}

export default CongressMan
