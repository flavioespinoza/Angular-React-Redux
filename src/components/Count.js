import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import store from '../redux/stores/store'
import * as actions from '../redux/actions/actions'

import { __app } from '../index'

const log = require('ololog').configure({
  locate: false
})

class CountComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      count: 0
    }

  }

  render() {

    const count = this.props.count

    return (
      <div className={'ml48 fl'}>

        <h2 className={'m-6'}>{count}</h2>

      </div>
    )
  }

}

function mapStateToProps (state) {
  return {
    count: state.count,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

const Count = connect(
  mapStateToProps,
  mapDispatchToProps
)(CountComponent);

__app().directive('count', function () {

  return {
    restrict: 'E',
    scope: true,
    template: '<div></div>',
    link: function (scope, element, attrs) {

      ReactDOM.render(<Provider store={store}><Count /></Provider>, element[0])

    }
  }

})