const log = require('ololog').configure({locate: false})

Array.prototype.__index_of = function(n, from_index, all) {

  let array = Object.assign([], this)
  let length = array.length

  let start = 0
  let start_from = from_index | 0

  console.log('start_from', start_from)

  if (start_from >= length) {
    return -1
  }

  if (start_from >= 0) {
    start = start_from
  } else {
    start = Math.max(length + start_from, 0)
  }


  if (!all) {

    let i = start

    while(i < length) {

      if (n === array[i]) {
        return i
      }

      i++

    }
  } else {
    let res = []
    for (let i = start; i < length; i++) {
      if (n === array[i]) {
        res.push(i)
      }
    }
    return res
  }

  return -1

}

const array = [2, 2, 3, 4, 3, 2, 0, 3, 9]

console.log(array.__index_of(3))
console.log(array.__index_of(3, -3))
console.log(array.__index_of(3, 3))
console.log(array.__index_of(3, 0, true))
console.log(array.__index_of(3, -3, true))


console.log(array.indexOf(3))
console.log(array.indexOf(3, -3))
console.log(array.indexOf(3, 3))
console.log(array.indexOf(3, 0))