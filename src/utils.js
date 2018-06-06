export function uniq_all_props(__arr1, __arr2) {
  let arr = __arr1.concat(__arr2)
  let set = []
  let result = []
  arr.forEach(function (__obj) {
    set.push([__obj].map(function (val, key) {
      return JSON.stringify(key) + '_' + JSON.stringify(val)
    })[0])
  })
  set.filter(function (elem, index, self) {
    if (index === self.indexOf(elem)) {
      result.push(arr[index])
    }
  })
  return result
}