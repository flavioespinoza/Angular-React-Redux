import angular from 'angular'
import registerServiceWorker from './registerServiceWorker'
import './index.css'

const app = angular.module('myApp', [])

app.controller('MainController', function ($scope) {

})

export function __app () {
  return app
}

require('./App')

require('./components/Count')
require('./components/CounterBtns')
require('./components/Hello')

registerServiceWorker()
