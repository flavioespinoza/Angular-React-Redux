import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { Provider } from 'react-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import store from '../../redux/stores/store'
import * as actions from '../../redux/actions/actions'

import _ from 'lodash'
import copyToClipboard from 'copy-to-clipboard'
import './WalletCard.css'

import { __app } from '../../index'
import { ___send_transaction, ___animate } from '../../index'
import * as u from '../../utils'

const Chance = require('chance')
const chance = new Chance()
const log = require('ololog').configure({
  locate: false
})

const google_qr_url = 'https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl='

class Card extends Component {

  constructor (props) {
    super(props)
    this.copyToClipboard = this.copyToClipboard.bind(this)
    // this.collapse = this.collapse.bind(this)
    // this.expand = this.expand().bind(this)
    // this.afterTransaction = this.afterTransaction.bind(this)
    // this.handleOpen = this.handleOpen.bind(this)
    // this.handleClose = this.handleClose.bind(this)

    this.state = {
      open: false,
      params: {},
      message: '',
    }

  }

  copyToClipboard (__address) {

    copyToClipboard(__address)

    const $add = document.getElementById('address_' + __address)
    const $ahd = document.getElementById('address_hash__display_' + __address)
    const $ahc = document.getElementById('address_hash__copied_' + __address)

    $add.classList.add('copy__confirm')
    $ahd.classList.add('hide')
    $ahc.classList.remove('hide')

    setTimeout(function () {
      $add.classList.remove('copy__confirm')
      $ahd.classList.remove('hide')
      $ahc.classList.add('hide')
    }, 2500)

  }

  collapse () {

    const btc_wallets = this.props.btc_wallets

    for (let i = 0; i < btc_wallets.length; i++) {

      let address = btc_wallets[i].wallet.address

      document.getElementById('receive_btn_toggle_' + address).classList.remove('hide')
      document.getElementById('send_btn_toggle_' + address).classList.remove('hide')
      document.getElementById('collapse_btn_' + address).classList.add('hide')
      document.getElementById('title_' + address).classList.remove('title-collapse')
      document.getElementById('label_' + address).classList.remove('text-expand')
      document.getElementById('qr_code_' + address).classList.remove('qr-code__fade-in')
      document.getElementById('address_' + address).classList.remove('address-hash__fade-in')

    }

  }

  expand (__address, __side) {

    const btc_wallets = this.props.btc_wallets

    console.log(__address)
    console.log(__side)

    if (btc_wallets.find((obj) => { return obj.wallet.address === __address})) {

      document.getElementById('collapse_btn_' + __address).classList.remove('hide')

      const $ttl = document.getElementById('title_' + __address)
      const $lbl = document.getElementById('label_' + __address)
      const $qrc = document.getElementById('qr_code_' + __address)
      const $add = document.getElementById('address_' + __address)
      const $rci = document.getElementById('receive_input_' + __address)
      const $sni = document.getElementById('send_input_' + __address)

      $ttl.classList.add('title-collapse')
      $lbl.classList.add('text-expand')


      if (__side === 'receive') {

        document.getElementById('receive_btn_toggle_' + __address).classList.add('hide')
        document.getElementById('send_btn_toggle_' + __address).classList.remove('hide')
        $rci.classList.add('receive-expand')
        $sni.classList.remove('send-expand')
        $qrc.classList.add('qr-code__fade-in')
        $add.classList.add('address-hash__fade-in')

      }

      if (__side === 'send') {

        document.getElementById('receive_btn_toggle_' + __address).classList.remove('hide')
        document.getElementById('send_btn_toggle_' + __address).classList.add('hide')
        $rci.classList.remove('receive-expand')
        $sni.classList.add('send-expand')
        $qrc.classList.remove('qr-code__fade-in')
        $add.classList.remove('address-hash__fade-in')

      }

    }

    for (let i = 0; i < btc_wallets.length; i++) {

      let address = btc_wallets[i].wallet.address

      if (address !== __address) {

        document.getElementById('receive_btn_toggle_' + address).classList.remove('hide')
        document.getElementById('send_btn_toggle_' + address).classList.remove('hide')
        document.getElementById('collapse_btn_' + address).classList.add('hide')
        document.getElementById('receive_input_' + address).classList.remove('receive-expand')
        document.getElementById('send_input_' + address).classList.remove('send-expand')
        document.getElementById('title_' + address).classList.remove('title-collapse')
        document.getElementById('label_' + address).classList.remove('text-expand')
        document.getElementById('qr_code_' + address).classList.remove('qr-code__fade-in')
        document.getElementById('address_' + address).classList.remove('address-hash__fade-in')

      }

    }

  }

  afterTransaction (__address, __side) {
    const self = this
    setTimeout(function () {
      self.expand(__address, __side)
    }, 1000)
  }

  handleOpen = (__wallet_id, __addresses, __amount, __coin, __label, __instruction) => {


    if (__amount === 0) {
      alert('Amount must be greater than 0!')
      return
    }

    const params = {
      transaction_id: chance.guid(),
      wallet_id: __wallet_id,
      date_time: new Date(),
      instruction: __instruction,
      label: __label,
      coin: __coin,
      addresses: __addresses,
      amount: __amount,
    }

    const btc_wallets = this.props.btc_wallets
    const send_to_wallet = function () {
      for (let i = 0; i < btc_wallets.length; i++) {
        let obj = btc_wallets[i]
        if (btc_wallets[i].wallet.address === params.addresses.to) {
          return btc_wallets[i].wallet.label
        }
      }
    }

    console.log(send_to_wallet())
    const message = 'Confirm you want to send ' + params.amount + ' ' + params.coin.toUpperCase() + ' to ' + send_to_wallet()

    this.setState({
      params: params,
      open: true,
      message: message
    })

  }

  handleClose = (__confirmation) => {

    const self = this

    if (__confirmation === 'confirm') {
      ___send_transaction(this.state.params)
    }

    this.setState({open: false})

    if (this.state.params.instruction === 'send to') {
      this.afterTransaction(this.state.params.addresses.from, 'send')
    } else {
      this.afterTransaction(this.state.params.addresses.to, 'receive')
    }

  }

  render() {

    const self = this
    const btc_wallets = this.props.btc_wallets
    const amount = this.props.amount
    const precision = this.props.precision

    const inst = {

      icon: function (__instruction) {
        if (__instruction === 'send to') {
          return 'send'
        } else {
          return 'save_alt'
        }
      },
      style: function (__instruction) {
        if (__instruction === 'receive from') {
          return {
            paddingLeft: 2,
            paddingRight: 2,
          }
        } else {
          return {
            paddingLeft: 4,
            paddingRight: 4,
          }
        }
      },
      addresses: function (__instruction, __to, __from) {
        if (__instruction === 'send to') {
          return {
            to: __to,
            from: __from,
          }
        } else {
          return {
            to: __from,
            from: __to,
          }
        }
      }

    }

    const confirmation = function () {
      const actions = [
        <FlatButton
          label="Cancel"
          primary={true}
          onClick={() => self.handleClose('cancel')}/>,

        <FlatButton
          label="Send"
          primary={true}
          keyboardFocused={true}
          onClick={() => self.handleClose('confirm')}/>,
      ]


      return (
        <div>
          <Dialog
            title="Dialog With Actions"
            actions={actions}
            modal={false}
            open={self.state.open}
            onRequestClose={self.handleClose}>
            {self.state.message}
          </Dialog>
        </div>
      )
    }

    const transaction = function (__address, __instruction) {
      
      return btc_wallets.map(function (__obj, __idx) {

        let wallet_id = __obj.wallet.id
        let address = __obj.wallet.address
        let label = __obj.wallet.label
        let coin = __obj.wallet.coin
        let amount = 0

        __obj.handle_amount = function (e) {
          amount = e.target.value
        }

        if (address !== __address) {

          let addresses = inst.addresses(__instruction, address, __address)

          return (
            <div key={chance.guid()} className={'send-input-wrapper mdl-shadow--2dp'}>

              <input type="number"
                     id={'input_' + label}
                     className={'fl'}
                     defaultValue={0}
                     min={0}
                     step={0.05}
                     onChange={__obj.handle_amount}/>

              <button id={'modal_btn'} className="fl mdl-button mdl-js-button mdl-js-ripple-effect ml4 modal-button"
                      onClick={() => self.handleOpen(wallet_id, addresses, amount, coin, label, __instruction)}
                      style={inst.style(__instruction)}>{__instruction} {label}<i className="material-icons mt-4 ml8">{inst.icon(__instruction)}</i>
              </button>

            </div>
          )
        }

      })

    }

    const send_recieve = function (wallet) {

      const qr_code_url = google_qr_url + wallet.address

      return (

        <div key={chance.guid()}>

          <span className={'wallet-label'}>{wallet.label}</span>

          <img id={'qr_code_' + wallet.address}
               className={'qr-code__image'}
               src={qr_code_url}
               alt={'QR Code'} />

          <span id={'address_' + wallet.address}
                className={'address-hash'}
                onClick={() => self.copyToClipboard(wallet.address)}>

                <span id={'address_hash__display_' + wallet.address}>{wallet.address}</span>

                <span id={'address_hash__copied_' + wallet.address}
                      className={'address-hash__copied hide'}>Copied to Clipboard!</span>
          </span>


          <span id={'receive_input_' + wallet.address} className={'receive'}>
            {transaction(wallet.address, 'receive from')}
          </span>
          

          <span id={'send_input_' + wallet.address} className={'send'}>
            {transaction(wallet.address, 'send to')}
          </span>
          

        </div>
      )
    }

    const wallet_cards = _.map(btc_wallets, function (__obj, __idx) {

      const wallet = __obj.wallet

      const pending = function (wallet) {

        let pending_deposits
        let pending_withdrawls

        if (wallet.pending_deposits > 0 && wallet.pending_withdrawls === 0) {
          pending_deposits = u.__display(wallet.pending_deposits, precision)
          return (
            <div>
              <p className={'mdl-card__title-text pos-abs b48 r24'}>Pending: {pending_deposits}</p>
            </div>
          )
        } else if (wallet.pending_deposits === 0 && wallet.pending_withdrawls < 0) {
          pending_withdrawls = u.__display(wallet.pending_withdrawls, precision)
          return (
            <div>
              <p className={'mdl-card__title-text pos-abs b48 r24'}
                 style={{ color: 'red', fontWeight: 'bold' }} >Pending: {pending_withdrawls}</p>
            </div>
          )
        } else if (wallet.pending_deposits > 0 && wallet.pending_withdrawls < 0) {
          pending_deposits = u.__display(wallet.pending_deposits, precision)
          pending_withdrawls = u.__display(wallet.pending_withdrawls, precision)
          return (
            <div>
              <p className={'mdl-card__title-text pos-abs r24'}
                 style={{ color: 'red', bottom: 72, fontWeight: 'bold' }} >Pending: {pending_withdrawls}</p>
              <p className={'mdl-card__title-text pos-abs b48 r24'}>Pending: {pending_deposits}</p>
            </div>
          )
        }

      }

      if (__obj.success) {

        return (

            <div id={'wallet_' + wallet.address}  key={wallet.address} className="m8 demo-card-wide mdl-card mdl-shadow--2dp">
              <div id={'title_' + wallet.address} className="mdl-card__title pos-rel">

                {pending(wallet)}

                <h4 className={'mdl-card__title-text pos-abs b12 l24'}>{wallet.coin.toUpperCase()}</h4>
                <h4 className={'mdl-card__title-text pos-abs b12 r24'}>{u.__display(wallet.spendable, precision)}</h4>

              </div>

              <div id={'label_' + wallet.address} className="pl24 mdl-card__supporting-text">

                {send_recieve(wallet)}

              </div>

              <div className="collapse-btn-wrapper mdl-card__actions mdl-card--border">
                <button id={'receive_btn_toggle_' + wallet.address} className="fl mdl-button mdl-js-button mdl-js-ripple-effect"
                        onClick={() => {self.expand(wallet.address, 'receive')}}
                        style={inst.style('receive from')}>
                  Receive <i className="material-icons mt-4">save_alt</i>
                </button>

                <button id={'collapse_btn_' + wallet.address}
                        className="collapse-btn mdl-button mdl-js-button mdl-js-ripple-effect hide"
                        onClick={() => {self.collapse()}}>
                  Close <i className="material-icons mt-4">expand_less</i>
                </button>

                <button id={'send_btn_toggle_' + wallet.address} className="fr mdl-button mdl-js-button mdl-js-ripple-effect"
                        onClick={() => self.expand(wallet.address, 'send')}
                        style={inst.style('send to')}>
                  Send <i className="material-icons mt-4">send</i>
                </button>
              </div>
            </div>

        )

        const coin = wallet.coin.toUpperCase()

      } else {

        let error_message = __obj.message

        return (
          <div key={chance.guid()} className="m8 demo-card-wide mdl-card mdl-shadow--2dp">
            <div className="mdl-card__title pos-rel">
              <h2 className={'mdl-card__title-text pos-abs l24'}>ERROR</h2>
            </div>
            <div style={{color: 'red', fontSize: 20}} className="pl24 mdl-card__supporting-text">
              {error_message}
            </div>
            <div className="mdl-card__actions mdl-card--border">
              <button className="fr mdl-button mdl-js-button mdl-js-ripple-effect">
                Help <i className="material-icons mt-4">help</i>
              </button>
            </div>
          </div>
        )
      }

    })

    return (
      <MuiThemeProvider>
        <div>

          {wallet_cards}

          {confirmation()}

        </div>
      </MuiThemeProvider>
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

const WalletCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Card)

__app().directive('walletCard', function () {

  return {
    restrict: 'E',
    scope: true,
    template: '<div></div>',
    link: function (scope, element, attrs) {

      ReactDOM.render(<Provider store={store}><WalletCard precision={4} /></Provider>, element[0])

    }
  }

})