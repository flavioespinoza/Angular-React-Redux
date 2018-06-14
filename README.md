##Bitgo Demo

Create a develop.js file in the server directory.

Copy the code below, paste it in the develop.js file and place your api keys and password.

```javascript

module.exports = {
  bitgo_api_key: '<your_api_key>',
  bitgo_secret_key: '<your_secret_key>',
  bitgo_password: '<your_password>',
}

```

```code

$ npm install

```
```code

$ node server/bitgo-server

```
```code

$ npm start

```

You should be running on <http://localhost:3000/>