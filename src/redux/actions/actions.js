const log = require('ololog').configure({locate: false})

export function setBtcWallets(__arr) {
  console.log('SET_BTC_WALLETS', __arr)
  return {
    type: 'SET_BTC_WALLETS',
    payload: __arr
  }
}