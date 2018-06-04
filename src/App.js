import React, { Component } from 'react'
import logo from './logo.svg'
import ReactDOM from 'react-dom'
import angular from 'angular'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Angular React Redux App</h1>
        </header>

      </div>
    );
  }
}

angular.module('myApp').directive('appContainer', function () {

  return {
    restrict: 'E',
    scope: true,
    template: '<div></div>',
    link: function (scope, element, attrs) {

      ReactDOM.render(<App />, element[0])

    }
  }

})
