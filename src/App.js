import React, {Component} from 'react'
import config from './config.json'

export default class App extends Component{
  render() {
    console.log('good day')
      console.log('guten tag')
    return (
      <div>{config.someText}</div>    
    );
  }
}
