const addTo = function (passed) {
  const balls = function (inner) {

    return passed + inner
  }

  return balls

}

let addThree = new addTo(3)
let addFour = new addTo(4)


console.log('addThree()', addThree(4))
console.log('addFour()', addFour(false))

