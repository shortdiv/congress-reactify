import CongressMan from './Congressman'

class CongressMen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'members': []
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

    fetch('https://api.propublica.org/congress/v1/114/senate/members.json',
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
        members: data.members
      })
    }).catch(function(err) {
      console.log("Request failed with " + err)
    })
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  render() {
    var rows= []

    if(!!this.state.members.length) {
      var republicansOnly = this.props.republicansOnly
      this.state.members.map(function(member, index) {
        if(republicansOnly && member.party == 'D') {
          //do nothing
        } else {
          rows.push(<CongressMan info={member} key={index}/>)
        }
      })
    }
    return (
      <div>
        {rows}
      </div>
    );
  }
}

export default CongressMen
