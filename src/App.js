import config from './config.json'
import styles from './style.css'

var CongressMan = React.createClass({
  getInitialState: function() {
    return {
      firstName: '',
      lastName: '',
      party: '',
      startDate: '',
      endDate: '',
      partyAffiliation: '',
      imageURL: 'https://www.congress.gov/img/member/'
    };
  },
  componentDidMount: function() {
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
        endDate: dates[dates.length - 1]
      })
    }
  },
  componentWillUnmount: function() {
    this.serverRequest.abort();
  },
  _getDates: function(roles) {
    var dates = [];
    roles.map(function(role) {
      dates.push(role.start_date);
      dates.push(role.end_date);
    })
    dates.sort();
    return dates;
  },
  _printPartyName: function(partyChar) {
    return partyChar === 'R' ? 'Republican' : 'Democrat'
  },
  render: function() {
    return (
      <div className='congressMan'>
      <a href="">
        <figure>
          <img src={this.state.imageURL} />
          <figcaption>{this.state.firstName} {this.state.lastName}</figcaption>
        </figure>
        <div>
          <p>{this.state.partyAffiliation}</p>
          <p>{this.state.startDate} - {this.state.endDate}</p>
        </div>
      </a>
      </div>
    );
  }
})

export default CongressMan
