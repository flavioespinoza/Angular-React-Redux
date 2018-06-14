import angular from 'angular'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import store from './redux/stores/store'

import logo from './logo.svg'
import registerServiceWorker from './registerServiceWorker'
import io from 'socket.io-client'
import * as actions from './redux/actions/actions'

import './index.css'

const log = require('ololog').configure({
  locate: false
})

/** WEBSOCKET */
const endpoint = {
  endpoint: 'http://127.0.0.1:9001',
}
const websocket = io(endpoint.endpoint)

const app = angular.module('myApp', [])

export function __app () {
  return app
}

__app().controller('MainController', function ($scope) {

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

__app().directive('appContainer', function () {

  return {
    restrict: 'E',
    scope: true,
    template: '<div></div>',
    link: function (scope, element, attrs) {

      ReactDOM.render(<Provider store={store} ><App /></Provider>, element[0])

    }
  }

})

require('./components/WalletCard/WalletCard')

/** Websocket */
websocket.emit('get_tbtc_wallet_list')
websocket.on('tbtc_wallet_list', function (__btc_wallet_list) {

  store.dispatch({type: 'SET_BTC_WALLETS', payload: __btc_wallet_list})

})

export function ___send_transaction (__params) {
  websocket.emit('send_transaction', __params)
  log.blue('send_transaction')
  console.log(__params)
}

registerServiceWorker()
