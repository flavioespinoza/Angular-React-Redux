const Chance = require('chance')
const chance = new Chance()
const log = require('ololog').configure({
  locate: false
})

export default function reducer (state = {

  btc_wallets: null,
  active_address: null,
  active_side: null,

}, action) {

  switch (action.type) {

    case 'SET_ACTIVE_ADDRESS': {
      // log.blue('SET_ACTIVE_ADDRESS', action.payload)
      return {
        ...state,
        active_address: action.payload
      }
    }
    case 'SET_ACTIVE_SIDE': {
      // log.blue('SET_ACTIVE_SIDE', action.payload)
      return {
        ...state,
        active_side: action.payload
      }
    }
    case 'SET_BTC_WALLETS': {
      // log.blue('SET_BTC_WALLETS', action.payload)
      return {
        ...state,
        btc_wallets: action.payload
      }
    }
  }

  return state

}