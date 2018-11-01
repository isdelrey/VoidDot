import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import '../styles/App.css'
import '../styles/System.css'
import Main from './views/Main'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Main}/>
        </Switch>
      </div>
    )
  }
}

export default App
