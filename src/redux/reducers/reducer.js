const Chance = require('chance')
const chance = new Chance()
const log = require('ololog').configure({
  locate: false
})

export default function reducer (state = {

  hello_msg: 'Hello Ren!',
  data: [],
  count: 0,
  btc_wallets: null,
  toggle_send_receive: false,
  amount: 0,
  active_address: null,
  active_side: null,

}, action) {

  switch (action.type) {

    case 'SET_ACTIVE_ADDRESS': {
      log.blue('SET_ACTIVE_ADDRESS', action.payload)
      return {
        ...state,
        active_address: action.payload
      }
    }
    case 'SET_ACTIVE_SIDE': {
      log.blue('SET_ACTIVE_SIDE', action.payload)
      return {
        ...state,
        active_side: action.payload
      }
    }
    case 'SET_AMOUNT': {
      log.blue('SET_AMOUNT', action.payload)
      return {
        ...state,
        amount: action.payload
      }
    }
    case 'SET_BTC_WALLETS': {
      // log.blue('SET_BTC_WALLETS', action.payload)
      return {
        ...state,
        btc_wallets: action.payload
      }
    }
    case 'TOGGLE_SEND_RECEIVE': {
      log.blue('TOGGLE_SEND_RECEIVE', action.payload)
      return {
        ...state,
        toggle_send_receive: action.payload
      }
    }
    case 'SET_HELLO_MESSAGE': {
      // log.blue('SET_HELLO_MESSAGE', action.payload)
      return {
        ...state,
        hello_msg: action.payload
      }
    }
    case 'SET_DATA': {
      // log.green('SET_DATA', JSON.stringify(action.payload))
      return {
        ...state,
        data: action.payload,
      }
    }
    case 'INCREMENT_COUNT': {
      // log.red('INCREMENT_COUNT', JSON.stringify(action.payload))
      return {
        ...state,
        count: action.payload,
      }
    }
  }

  return state

}