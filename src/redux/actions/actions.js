import store from '../stores/store'

const log = require('ololog').configure({locate: false})

export function setBtcWallets(__arr) {
  console.log('SET_BTC_WALLETS', __arr)
  return {
    type: 'SET_BTC_WALLETS',
    payload: __arr
  }
}

export function setAmount(__amount) {
  log.green('SET_AMOUNT', __amount)
  return {
    type: 'SET_AMOUNT',
    payload: __amount
  }
}

export function toggleSendRecieve(__bool) {
  log.red('TOGGLE_SEND_RECEIVE', __bool)
  return {
    type: 'TOGGLE_SEND_RECEIVE',
    payload: __bool
  }
}

export function setHelloMessage(__hello_msg) {

  return {
    type: 'SET_HELLO_MESSAGE',
    payload: __hello_msg
  }

}

export function pushData(__item) {

  let data = store.getState().data
  data.push(__item)

  return {
    type: 'SET_DATA',
    payload: data
  }

}

export function setData(__data) {
  return {
    type: 'SET_DATA',
    payload: __data
  }
}

export function incramentCount(__num) {
  // console.log('__num', __num)
  return {
    type: 'INCREMENT_COUNT',
    payload: __num
  }

}