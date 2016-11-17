import React, {Component} from 'react'
import config from './config.json'

class App extends Component{
  render() {
    console.log('goodbye')
    return (
      <div>{config.someText}</div>    
    );
  }
}

export default App
