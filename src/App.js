import config from './config.json'

var CongressMan = React.createClass({
  render: function() {
    return (
      <div>{this.props.name}</div>
    );
  }
})

export default CongressMan
