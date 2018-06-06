import angular from 'angular'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import store from './redux/stores/store'

import logo from './logo.svg'
import registerServiceWorker from './registerServiceWorker'
import io from 'socket.io-client'
import * as actions from './redux/actions/actions'

import './App.css'
import './index.css'

const log = require('ololog').configure({
  locate: false
})

/** WEBSOCKET */
const endpoint = {
  endpoint: 'http://127.0.0.1:9001',
}
const websocket = io(endpoint.endpoint)

websocket.emit('get_tbtc_wallet_list')
websocket.on('tbtc_wallet_list', function (__btc_wallet_list) {

  store.dispatch({type: 'SET_BTC_WALLETS', payload: __btc_wallet_list})
  actions.setBtcWallets(__btc_wallet_list)

})

const app = angular.module('myApp', [])

app.controller('MainController', function ($scope) {

})

class Container extends Component {
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

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Container)

app.directive('appContainer', function () {

  return {
    restrict: 'E',
    scope: true,
    template: '<div></div>',
    link: function (scope, element, attrs) {

      ReactDOM.render(<Provider store={store} ><App /></Provider>, element[0])

    }
  }

})

export function __app () {
  return app
}

require('./components/Count')
require('./components/CounterBtns')
require('./components/Hello')
require('./components/WalletCard/WalletCard')

registerServiceWorker()
