import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import store from '../../redux/stores/store'
import * as actions from '../../redux/actions/actions'

import { __app } from '../../index'
import _ from 'lodash'
import copyToClipboard from 'copy-to-clipboard'
import './WalletCard.css'

const Chance = require('chance')
const chance = new Chance()
const log = require('ololog').configure({
  locate: false
})

class Card extends Component {

  constructor(props) {
    super(props)

    this.copyToClipboard = this.copyToClipboard.bind(this)
    this.recieve = this.recieve.bind(this)
    this.send = this.send.bind(this)

    this.state = {
      count: 0,
    }

  }

  copyToClipboard (__address) {

    copyToClipboard(__address)

    const $address = document.getElementById('address_' + __address)
    const $address_hash__display = document.getElementById('address_hash__display_' + __address)
    const $address_hash__copied = document.getElementById('address_hash__copied_' + __address)

    $address.classList.add('copy__confirm')
    $address_hash__display.classList.add('hide')
    $address_hash__copied.classList.remove('hide')

    setTimeout(function () {
      $address.classList.remove('copy__confirm')
      $address_hash__display.classList.remove('hide')
      $address_hash__copied.classList.add('hide')
    }, 2500)

  }

  recieve(__address) {

    const $title = document.getElementById('title_' + __address)
    const $label = document.getElementById('label_' + __address)
    const $qr_code = document.getElementById('qr_code_' + __address)
    const $address = document.getElementById('address_' + __address)

    $title.classList.add('title-collapse')
    $label.classList.add('text-expand')
    $qr_code.classList.add('qr-code__fade-in')
    $address.classList.add('address-hash__fade-in')

  }

  send() {

  }

  close(){

  }

  render() {

    const self = this

    let wallet_obj =   {
      "label": "Bittrex",
      "coin": "tbtc",
      "balance": 0.91015287,
      "address": "2MxhSJPqgFyxhnmypbx26pi24vhHuAcC1SD",
      "satoshi": 91015287
    }

    const style = {
      btn: {
        fontSize: 11
      }
    }

    const btc_wallets = _.map(this.props.btc_wallets, function (__obj, __idx) {

      const coin = __obj.coin.toUpperCase()

      const qr_code_url = 'https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=' + __obj.address

      return (
        <div key={__obj.address} className="m8 demo-card-wide mdl-card mdl-shadow--2dp">


          <div id={'title_' + __obj.address} className="mdl-card__title pos-rel">
            <h2 className={'mdl-card__title-text pos-abs l24'}>{__obj.balance}</h2>
            <h2 className={'mdl-card__title-text pos-abs r24'}>{coin}</h2>
          </div>

          <div id={'label_' + __obj.address} className="pl24 mdl-card__supporting-text">

            <span>{__obj.label}</span>

            <img id={'qr_code_' + __obj.address}
                 className={'qr-code__image'}
                 src={qr_code_url}
                 alt={'QR Code'} />

            <span>
              <span id={'address_' + __obj.address}
                    className={'address-hash'}
                    onClick={() => self.copyToClipboard(__obj.address)}>
                <span id={'address_hash__display_' + __obj.address} >{__obj.address}</span>
                <span id={'address_hash__copied_' + __obj.address} className={'address-hash__copied hide'} >

                  Copied to Clipboard!
                </span>
              </span>
            </span>


          </div>

          <div className="mdl-card__actions mdl-card--border">
            <button className="mdl-button mdl-js-button mdl-js-ripple-effect"
                    onClick={() => {self.recieve(__obj.address)}}
                    style={style.btn}>
              Recieve <i className="material-icons mt-4">save_alt</i>
            </button>
            <button className="fr mdl-button mdl-js-button mdl-js-ripple-effect">
              Send <i className="material-icons mt-4">send</i>
            </button>
          </div>

        </div>
      )

    })

    return (
      <div>
        {btc_wallets}
      </div>
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

      ReactDOM.render(<Provider store={store}><WalletCard /></Provider>, element[0])

    }
  }

})