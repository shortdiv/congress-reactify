import 'whatwg-fetch'

class CongressMan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      startDate: '',
      endDate: '',
      partyAffiliation: '',
      currentRole: '',
      seniority: '',
      imageURL: ''
    }
  }

  componentDidMount() {
    var that = this;
    function checkStatus(response) {
      if(response.status >= 200 && response.status < 300) {
        return response
      } else {
        var error = new Error(response.statusText);
        error.response = response
        throw error
      }
    }

    function parseJson(response) {
      return response.json()
    }

    fetch('https://api.propublica.org/congress/v1/members/' + that.props.id + '.json',
    {
      method: 'GET',
      headers: { 'X-API-Key': __CONGRESS__ }
    })
    .then(checkStatus)
    .then(parseJson)
    .then(function(resJson) {
      var data = resJson.results[0];
      that.data = data;

      that.setState({
        firstName: data.first_name,
        lastName: data.last_name,
        partyAffiliation: that._printPartyName(data.current_party),
        imageURL: 'https://www.congress.gov/img/member/' + that.props.id.toLowerCase() + '.jpg',
        dates: that._getDates(data.roles),
        startDate: that._getDates(data.roles)[0],
        endDate: that._getDates(data.roles)[that._getDates(data.roles).length - 1],
        currentRole: data.roles[0].congress + "th " + data.roles[0].chamber,
        seniority: that.props.senior
      })
    }).catch(function(err) {
      console.log("Request failed with " + err)
    })
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
          <p>Seniority: {this.state.seniority}</p>
          <p> Years of Service: {this.state.startDate} - {this.state.endDate}</p>
        </div>
      </a>
      </div>
    );
  }
}

export default CongressMan
