# Bitgo Demo on Testnet

### You will need to a account set up on <https://test.bitgo.com>

### Create a develop.js file in the server directory.

Copy the code below, paste it into the development.js file and fill in with your api keys and password.

```javascript

module.exports = {
  bitgo_api_key: 'your_api_key',
  bitgo_secret_key: 'your_secret_key',
  bitgo_password: 'your_password',
}

```

```code

$ npm install

```

Open new and terminal type
```code

$ node server/bitgo-server

```

Open different terminal and type
```code

$ npm start

```

You should be running on <http://localhost:3000/>

### This only works with TBTC

You can send TBTC to your Bitgo testnet addresses from <https://testnet.manu.backend.hamburg/faucet>