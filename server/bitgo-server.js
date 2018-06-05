const express = require('express')
const http = require('http')
const socketIo = require('socket.io')

const index = require('./routes/index')
const port = process.env.PORT || 9001
const app = express()
const server = http.createServer(app)
const io = socketIo(server)

const BitGoJS = require('bitgo')
const Q = require('q')
const _ = require('lodash')
const log = require('ololog').configure({locate: false})

app.use(index)

let keys
if (process.env.NODE_ENV === 'production') {
  keys = require('./production')
} else {
  keys = require('./development')
}

const wallet_params = {
  name: 'bitgo',
  apiKey: keys.bitgo_api_key,
  secret: keys.bitgo_secret_key,
  secret_passphrase: keys.secret_passphrase,
  nonce: function () {
    return this.milliseconds()
  }
}

const wallet_name = wallet_params.name
const api_key = wallet_params.apiKey
const secret_key = wallet_params.secret
const secret_passphrase = wallet_params.secret_passphrase

const bitgo = new BitGoJS.BitGo({
  env: 'test', accessToken: secret_key
})

let btc_testnet_coins = {
  btc_address_testnet: '2N8hwP1WmJrFF5QWABn38y63uYLhnJYJYTF',
  website: 'https://testnet.manu.backend.hamburg/faucet'
}

const constants = []
const divisor = 100000000

bitgo.fetchConstants().then(function (constants) {

  // log.lightBlue(JSON.stringify(constants, null, 2))

})

bitgo.session({}, function callback (err, session) {

  if (err) {
    log.red('bitgo.session ERROR', err)
    return
  }

})

async function get_wallet_list (__coin) {

  const wallet_list = []

  return new Promise(function (resolve, reject) {

    return bitgo.coin(__coin).wallets().list({}).then(function (wallets) {

      let all_wallets = wallets.wallets

      return Q.allSettled(all_wallets.map(async (__wallet) => {

        wallet_list.push(await get_wallet(__wallet._wallet.id))

      })).then(function (__res) {

        resolve(wallet_list)

      })

    })

  }).then(function (response) {

    return response

  }).catch(function (err) {

    log.red('get_wallet_list ERROR ', err)

  })

}

async function get_wallet (__wallet_id) {

  return new Promise(function (resolve, reject) {

    return bitgo.coin('tbtc').wallets().get({id: __wallet_id}).then(function (wallet) {

      // log.yellow(JSON.stringify(wallet._wallet, null, 2))

      let wallet_info = {}
      let __wallet = wallet._wallet

      wallet_info.label = __wallet.label
      wallet_info.coin = __wallet.coin
      wallet_info.address = __wallet.receiveAddress.address
      wallet_info.satoshi = __wallet.balance
      wallet_info.balance = wallet_info.satoshi / divisor

      // log.cyan(JSON.stringify(wallet_info, null, 2))

      resolve(wallet_info)

    })

  }).then(function (response) {
    return response
  }).catch(function (err) {
    log.red('get_wallet ERROR ', err)
  })

}

async function test_1 (__info) {
  log.black('test_1', JSON.stringify(__info))
}

function test_2 (__info) {
  log.cyan('test_2', JSON.stringify(__info, null, 2))
}

/** Websocket */
io.on('connection', socket => {

  socket.on('get_btc_wallet_list', function () {
    (async function () {
      let wallet_list = await get_wallet_list('tbtc')
      log.blue(JSON.stringify(wallet_list, null, 2))
      socket.emit('btc_wallet_list', wallet_list)
      log.green('emit btc_wallet_list')
    })()
  })

  console.log('connected...')

})

server.listen(port, () => log.lightYellow(`Listening on port ${port}`))