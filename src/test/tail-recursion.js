function tail_recursive_factorial (x, running_total = 1) {
  if (x === 0) {
    return running_total
  } else {
    return tail_recursive_factorial (x - 1, running_total * x)
  }
}

console.log(tail_recursive_factorial(4))
console.log(tail_recursive_factorial(5))
console.log(tail_recursive_factorial(6))


function tail_recursive_sum (x, running_total = 0) {
  if (x === 0) {
    return running_total
  } else {
    return tail_recursive_sum (x - 1, running_total + x)
  }
}

console.log(tail_recursive_sum(4))
console.log(tail_recursive_sum(5))
console.log(tail_recursive_sum(6))

const arr = [1, 2, 3, 4]

function some_name (array) {
  let res = []
  array.forEach(function (number, index, arr) {
    let product = 1
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== number) {
        product = product * arr[i]
      }
    }
    res[index] = product
  })
  return res
}

console.log(some_name(arr))

function factorial (i, product = 1) {
  if (i === 0) {
    return product
  } else {
    return factorial(i - 1, product * i)
  }
}

console.log(factorial(4))
console.log(factorial(5))
console.log(factorial(6))

// function all_factorial (array) {
//   let res = []
//   array.forEach(function (number, index, arr) {
//     res.push(factorial(number))
//   })
//   return res
// }

function all_factorial (length) {
  let res = []
  for (let i = 0; i < length; i++) {
    res.push(factorial(i))
  }
  return res
}

let arr_2 = [4, 5, 6, 7, 170]

console.time(all_factorial)
console.log(all_factorial(100000))
console.timeEnd(all_factorial)