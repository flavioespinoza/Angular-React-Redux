let json1 = ['one', 'two']
let json2 = ['one', 'two', 'three', 'four']
let json3 = ['one', 'two', 'three', 'four']
let json4 = ['one', 'two', 'three', 'four', 'five']
let json5 = ['one', 'two', 'three', 'four', 'five']

function uniq_n_shit (arr1, arr2, type) {

  let concat = arr1.concat(arr2)
  let set = [...new Set(concat)]

  if (!type || type === 'uniq' || type === 'unique') {

    return set

  } else if (type === 'duplicate') {

    concat = arr1.concat(arr2)
    return concat.filter(function (obj, index, self) {
      return index !== self.indexOf(obj)
    })

  } else if (type === 'not_duplicate') {

    let duplicates = concat.filter(function (obj, index, self) {
      return index !== self.indexOf(obj)
    })

    for (let r = 0; r < duplicates.length; r++) {
      let i = set.indexOf(duplicates[r]);
      if(i !== -1) {
        set.splice(i, 1);
      }
    }

    return set

  }
}

console.log(uniq_n_shit(json1, json2, null)) // => [ 'one', 'two', 'three', 'four' ]
console.log(uniq_n_shit(json1, json2, 'uniq')) // => [ 'one', 'two', 'three', 'four' ]
console.log(uniq_n_shit(json1, json2, 'duplicate')) // => [ 'one', 'two' ]
console.log(uniq_n_shit(json1, json2, 'not_duplicate')) // => [ 'three', 'four' ]