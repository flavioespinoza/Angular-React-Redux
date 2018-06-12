const log = require('ololog').configure({locate: false})

function isPrime (number) {

  let start = 2

  while (start <= Math.sqrt(number)) {

    if (number % start < 1) {
      return false
    }

    start++

  }

  return number > 1

}

function findPrime (nth) {

  let count = 0
  let i = 0

  while (count < nth) {

    if (isPrime(i)) {
      count++
      if (count === nth) {
        return i
      }
    }

    i++

  }

}

console.time(findPrime)

let nth = 10001
let prime = findPrime(nth)
log.lightYellow('the ' + nth + 'st prime number is: ' + prime)

console.timeEnd(findPrime) // 84.299ms

