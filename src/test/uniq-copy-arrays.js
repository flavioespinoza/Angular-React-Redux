const log = require('ololog').configure({locate: false})

const arr1 = [{"name":"ren","age":3,"weight":120},{"name":"ren","age":2,"weight":100},{"name":"ren","age":2,"weight":100},{"name":"ren","age":2,"weight":100},{"name":"ren","age":2,"weight":100},{"name":"ren","age":2,"weight":100},{"name":"ren","age":1,"weight":100},{"name":"stimpy","age":2,"weight":100},{"name":"george american","age":56,"weight":220}]
const arr2 = [{"name":"ren","age":2,"weight":150},{"name":"ren","age":2,"weight":150},{"name":"ren","age":2,"weight":150},{"name":"ren","age":2,"weight":100},{"name":"stimpy","age":2,"weight":100},{"name":"ren","age":3,"weight":100},{"name":"stimpy","age":1,"weight":100},{"name":"ren","age":2,"weight":100},{"name":"circus midgets","age":5,"weight":200}]

function uniq_all_props (__arr1, __arr2) {
  let arr = __arr1.concat(__arr2)
  console.log('arr.length', arr.length)
  let set = []
  let result = []
  arr.forEach(function (__obj) {
    /** Set each obj to a string. */
    let string = JSON.stringify(__obj)
    set.push(string)
  })
  set.filter(function (elem, index, self) {
    /** Use filter as a loop to push onto results array.
     * This is done to preserve prop types from original arrays */
    if (index === self.indexOf(elem)) {
      result.push(arr[index])
    }
  })
  return result
}

let res = uniq_all_props(arr1, arr2)
console.log(res)
console.log(res.length)

let numbers = [1, 2, 2, 4, 5, 5, 7, 8]
let letters = ['a', 'b', 'b', 'c', 'd', 'd', 'e']

let obj = {}
for (let i of numbers) {
  obj[i] = true
}

let b = Object.keys(obj)
console.log('b', b)

let l = [... new Set(letters)]
console.log('l', l)


/** copy array */
let copy_l = Object.assign([], l)
let copy_l_2 = [...l]

l.push('g', 'j', 't', 't')

console.log('copy_l', copy_l)

console.log('l', l)

console.log('copy_l', copy_l)

console.log('copy_l_2', copy_l_2)