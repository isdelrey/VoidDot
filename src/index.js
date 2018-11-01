import React from 'react'
import ReactDOM from 'react-dom'
import App from '../src/components/App'
import { HashRouter } from 'react-router-dom'

const startApp = () => {
    ReactDOM.render(
        <HashRouter>
          <App />
        </HashRouter>,
      document.getElementById('root'),
    )
  }
  
console.log("Cordova", window.cordova)
if(window.cordova) {
    document.addEventListener('deviceready', startApp, false)
} else {
    startApp()
}