import config from './config.json'

var CongressMan = React.createClass({
  getInitialState: function() {
    return {
      firstName: '',
      lastName: ''
    };
  },
  componentDidMount: function() {
    this.serverRequest = new XMLHttpRequest();
    this.serverRequest.open('GET', 'https://api.propublica.org/congress/v1/114/senate/members.json', false);
    this.serverRequest.setRequestHeader("X-API-Key", process.env.congress);
    this.serverRequest.send()
    if(this.serverRequest.status === 200) {
      var data = JSON.parse(this.serverRequest.responseText).results[0]
        this.data = data;
      this.setState({
        firstName: data.chamber,
        lastName: data.congress
      })
    }
  },
  componentWillUnmount: function() {
    this.serverRequest.abort();
  },
  render: function() {
    return (
      <div>
      <div>{this.state.firstName}</div>
      <div>{this.state.lastName}</div>
      </div>
    );
  }
})

export default CongressMan
