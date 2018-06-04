import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { __app } from '../index'
import Greeting from './Greeting'

class Hello extends Component {
  render() {
    return (
      <Greeting/>
    )
  }
}

__app().directive('hello', function () {

  return {
    restrict: 'E',
    scope: true,
    template: '<div></div>',
    link: function (scope, element, attrs) {

      ReactDOM.render(<Hello/>, element[0])

    }
  }

})