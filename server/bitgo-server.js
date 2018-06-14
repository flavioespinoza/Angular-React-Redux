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
  password: keys.bitgo_password,
  nonce: function () {
    return this.milliseconds()
  }
}

const bitgo = new BitGoJS.BitGo({
  env: 'test', accessToken: wallet_params.secret
})
const satoshi = 1e8
let __wallets = []

async function get_wallet_list (__coin, __socket) {

  try {

    return bitgo.coin(__coin).wallets().list({}).then(async function (wallets) {

      let wallet_list = []

      let all_wallets = wallets.wallets
      let simple_list = all_wallets.map(function (obj) {
        return {
          id: obj._wallet.id,
          name: obj._wallet.label
        }
      })

      for (let i = 0; i < all_wallets.length; i++) {

        let id = all_wallets[i]._wallet.id

        let single_wallet = await get_wallet(__coin, id, simple_list, __socket)

        if (!single_wallet.address) {
          wallet_list.push({success: false, message: single_wallet, wallet: {}})
        } else {
          wallet_list.push({success: true, message: 'success', wallet: single_wallet})
        }

      }

      __wallets = wallet_list

      let list_name = __coin + '_wallet_list'
      __socket.emit(list_name, wallet_list)

    }).catch(function (__err) {

      log.red('error_wallet', __err.message)
      log.bright.red('get_wallet_list().then()')

      __socket.emit('error_wallet', {
        message: __err.message,
        in_function: 'get_wallet_list().then()',
        log_color: 'red'
      })

    })

  } catch (__err) {

    log.cyan('error_wallet', __err.message)
    log.bright.cyan('get_wallet_list() try {} catch() {}')

    __socket.emit('error_wallet', {
      message: __err.message,
      in_function: 'get_wallet_list() try {} catch() {}',
      log_color: 'cyan'
    })

  }

}

async function get_wallet (__coin, __wallet_id, __wallet_list, __socket) {

  try {

    return bitgo.coin(__coin).wallets().get({id: __wallet_id}).then(function (wallet) {

      let wallet_info = {}
      let __wallet = wallet._wallet
      let label = wallet._wallet.label

      return wallet.transfers()
        .then(function (__transfers) {

          let transfer_list = []
          let pending_deposits = 0
          let pending_withdrawls = 0

          for (let i = 0; i < __transfers.transfers.length; i++) {
            let obj = __transfers.transfers[i]
            let state = 'confirmed'
            if (__transfers.transfers[i].state === 'unconfirmed') {
              state = 'pending'
              if (Math.sign(__transfers.transfers[i].value) === -1) {
                pending_withdrawls += __transfers.transfers[i].value / satoshi
              } else {
                pending_deposits += __transfers.transfers[i].value / satoshi
              }
            }
            transfer_list.push({
              value: __transfers.transfers[i].value / satoshi,
              state: state,
              usd: __transfers.transfers[i].usd,
            })
          }

          let transfers = {
            name: label,
            count: __transfers.transfers.length,
            list: transfer_list
          }

          wallet_info.id = __wallet.id
          wallet_info.label = label
          wallet_info.coin = __wallet.coin
          wallet_info.address = __wallet.receiveAddress.address
          wallet_info.satoshi = __wallet.balance
          wallet_info.transfers = transfers
          wallet_info.pending_deposits = pending_deposits
          wallet_info.pending_withdrawls = pending_withdrawls
          wallet_info.balance   = __wallet.balance / satoshi
          wallet_info.confirmed = __wallet.confirmedBalance / satoshi
          wallet_info.spendable = __wallet.spendableBalance / satoshi

          return wallet_info

        })
        .catch(function (error) {
          log.lightYellow('ERROR: Wallet Transfers')
        })

    }).catch(function (__err) {

      log.red('error_wallet', __err.message)
      log.bright.red('get_wallet().then()')

      __socket.emit('error_wallet', {
        message: __err.message,
        in_function: 'get_wallet().then()',
        log_color: 'red'
      })

      return __err.message

    })

  } catch (__err) {

    log.cyan('error_wallet ', __err.message)
    log.bright.cyan('get_wallet() try {} catch() {}')

    __socket.emit('error_wallet', {
      message: __err.message,
      in_function: 'get_wallet() try {} catch() {}',
      log_color: 'cyan'
    })

  }

}

async function send_transaction (__params, __socket) {

  let send_to_address = __params.addresses.to
  let send_from_address = __params.addresses.from
  let amount = __params.amount * satoshi

  bitgo.coin(__params.coin).wallets().getWalletByAddress({address: send_from_address})
    .then(function (wallet) {

      let my_wallet = wallet

      let params = {
        amount: amount,
        address: send_to_address,
        walletPassphrase: wallet_params.password
      }

      my_wallet.send(params)
        .then(function (transaction) {

          log.bright.cyan(transaction)
          __socket.emit('transaction', transaction)

        })
        .catch(function (error) {
          log.yellow(error)
        })

    })
    .catch(function (error) {
      log.lightYellow(error)
    })

}


/** Websocket */
io.on('connection', function (socket) {

  console.log('connected...')

  socket.on('get_tbtc_wallet_list', async function () {
    await get_wallet_list('tbtc', socket)
  })

  socket.on('send_transaction', async function (__params) {
    await send_transaction(__params, socket)
  })

})

const unhandledRejections = new Map()
process.on('unhandledRejection', (reason, p) => {
  unhandledRejections.set(p, reason)
  log.magenta('Unhandled Rejection at:', p, 'reason:', reason)
})
process.on('rejectionHandled', (p) => {
  unhandledRejections.delete(p)
  log.magenta('rejectionHandled', p)
})
process.on('uncaughtException', (err) => {
  log.magenta(`uncaughtException: ${err}\n`)
})

server.listen(port, () => log.lightYellow(`Listening on port ${port}`))