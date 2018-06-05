import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import store from '../redux/stores/store'
import * as actions from '../redux/actions/actions'

import { __app } from '../index'
import _ from 'lodash'

const Chance = require('chance')
const chance = new Chance()
const log = require('ololog').configure({
  locate: false
})

class Btns extends Component {

  constructor(props) {
    super(props)

    console.log('props', props)

    this.increaseCount = this.increaseCount.bind(this)
    this.decreaseCount = this.decreaseCount.bind(this)

    this.state = {
      count: 0
    }

  }

  increaseCount() {
    const count = this.props.count + 1
    const action = this.props.actions
    action.incramentCount(count)
    // log.lightBlue('++count', count)
  }

  decreaseCount() {
    const count = this.props.count - 1
    const action = this.props.actions
    action.incramentCount(count)
    // log.lightRed('--count', count)
  }

  render() {

    let wallet_obj =   {
      "label": "Bittrex",
      "coin": "tbtc",
      "balance": 0.91015287,
      "address": "2MxhSJPqgFyxhnmypbx26pi24vhHuAcC1SD",
      "satoshi": 91015287
    }

    const btc_wallets = _.map(this.props.btc_wallets, function (__obj, __idx) {

      const rows = _.map(__obj, function (__val, __key) {
        return (
          <li key={chance.guid()} className="li-wallet mt4 mb4">{__key + ': ' + __val}</li>
        )
      })

      return (
        <ul key={chance.guid()}>
          {rows}
        </ul>
      )

    })

    return (
      <div className={'fl'}>

        <button className={'mr8 mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent'}
                onClick={this.decreaseCount}>
          Decrease
        </button>

        <button className={'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored'}
                onClick={this.increaseCount}>
          Increase
        </button>

      </div>
    )
  }

}

function mapStateToProps (state) {
  return {
    ...state,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

const CounterBtns = connect(
  mapStateToProps,
  mapDispatchToProps
)(Btns)

__app().directive('counterBtns', function () {

  return {
    restrict: 'E',
    scope: true,
    template: '<div></div>',
    link: function (scope, element, attrs) {

      ReactDOM.render(<Provider store={store}><CounterBtns /></Provider>, element[0])

    }
  }

})