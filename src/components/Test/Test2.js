import React from 'react'
import { __app } from '../../index'
import ReactDOM from 'react-dom'

class Foo extends React.Component {
  

  render() {

    return (
      <div>
        <button onClick={() => this.display('Flavio')}>Display Name</button>
      </div>
    )
  }

}

__app().directive('hello', function () {

  return {
    restrict: 'E',
    scope: true,
    template: '<div></div>',
    link: function (scope, element, attrs) {

      ReactDOM.render(<Foo/>, element[0])

    }
  }

})