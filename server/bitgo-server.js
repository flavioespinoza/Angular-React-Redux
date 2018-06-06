const express = require('express')
const app = express()
const port = process.env.PORT || 9001
const http = require('http')
const index = require('./routes/index')
const server = http.createServer(app)
const socketIo = require('socket.io')
const io = socketIo(server)
const BitGoJS = require('bitgo')
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

const bitgo = new BitGoJS.BitGo({
  env: 'test', accessToken: wallet_params.secret
})
const divisor = 100000000

async function get_wallet_list (__coin, __socket) {

  try {

    return bitgo.coin(__coin).wallets().list({}).then(async function (wallets) {

      const wallet_list = []

      let all_wallets = wallets.wallets

      for (let i = 0; i < all_wallets.length; i++) {

        let id = all_wallets[i]._wallet.id

        let single_wallet = await get_wallet(__coin, id, __socket)

        if (!single_wallet.address) {
          wallet_list.push({success: false, message: single_wallet, wallet: {}})
        } else {
          wallet_list.push({success: true, message: 'success', wallet: single_wallet})
        }

      }

      // log.blue(JSON.stringify(wallet_list, null, 2))

      let list_name = __coin + '_wallet_list'
      __socket.emit(list_name, wallet_list)

    }).catch(function (__err) {

      log.red('error_get_wallet_list', __err.message)

      __socket.emit('error_get_wallet_list', { message: __err.message, in_function: 'get_wallet_list' })

    })

  } catch (__err) {

    log.cyan('error_get_wallet_list', __err.message)

    __socket.emit('error_get_wallet_list', { message: __err.message, in_function: 'get_wallet_list' })

  }

}

async function get_wallet (__coin, __wallet_id, __socket) {

  try {

    return bitgo.coin(__coin).wallets().get({id: __wallet_id}).then(function (wallet) {

      let wallet_info = {}
      let __wallet = wallet._wallet

      wallet_info.label = __wallet.label
      wallet_info.coin = __wallet.coin
      wallet_info.address = __wallet.receiveAddress.address
      wallet_info.satoshi = __wallet.balance
      wallet_info.balance = wallet_info.satoshi / divisor

      return wallet_info

    }).catch(function (__err) {

      log.lightYellow('error_get_wallet', __err.message)

      return __err.message

    })

  } catch (__err) {

    log.bright.blue('error_get_wallet', __err.message)

    __socket.emit('error_get_wallet', { message: __err.message, in_function: 'get_wallet' })


  }

}

/** Websocket */
io.on('connection', socket => {

  socket.on('get_tbtc_wallet_list', async function () {
    await get_wallet_list('tbtc', socket)
  })

  console.log('connected...')

})

server.listen(port, () => log.lightYellow(`Listening on port ${port}`))