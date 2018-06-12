export function uniq_all_props(__arr1, __arr2) {

  let arr = __arr1.concat(__arr2)
  let set = []
  let result = []

  /** Set each obj to a string. */
  arr.forEach(function (__obj) {
    let string = JSON.stringify(__obj)
    set.push(string)
  })

  /** Use filter as a loop to push onto results array.
   * Done to preserve prop types from original arrays */
  set.filter(function (elem, index, self) {
    if (index === self.indexOf(elem)) {
      result.push(arr[index])
    }
  })

  return result

}