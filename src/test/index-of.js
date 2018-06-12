const log = require('ololog').configure({locate: false})

const array = [2, 9, 9, 2, 3, 4]

Array.prototype.__index_of = function(n, from_index) {

  let result = -1
  let array = Object.assign([], this)
  let length = array.length

  if (!from_index) {
    from_index = 0
  }

  if (from_index >= length) {
    return -1
  }

  let start = 0
  if (from_index >= 0) {
    start = from_index
  } else {
    start = length + from_index
    console.log('start', start)
  }

  for (let i = start; i < length; ++i) {

    if (result <= -1) {
      if (n === array[i]) {
        result = i
      }
    }

  }

  return result

}

console.log(array.__index_of(2))
console.log(array.__index_of(7))
console.log(array.__index_of(9, 2))
console.log(array.__index_of(3))
console.log(array.__index_of(3, -1))
console.log(array.__index_of(2, -1))
console.log(array.__index_of(2, -3))
console.log(array.__index_of(2, -4))
console.log(array.__index_of(2, -5))
console.log(array.__index_of(2, -6))

//

console.log(array.indexOf(2))
console.log(array.indexOf(7))
console.log(array.indexOf(9, 2))
console.log(array.indexOf(3))
console.log(array.indexOf(3, -1))
console.log(array.indexOf(2, -1))
console.log(array.indexOf(2, -3))
console.log(array.indexOf(2, -4))
console.log(array.indexOf(2, -5))
console.log(array.indexOf(2, -6))


let indices = [];
let __array = ['a', 'b', 'a', 'c', 'a', 'd'];
let element = 'a';
let idx = __array.__index_of(element);
while (idx !== -1) {
  indices.push(idx);
  idx = __array.__index_of(element, idx + 1);
}
console.log(indices);
