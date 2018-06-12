const log = require('ololog').configure({locate: false})

function create_triangle (num_rows) {

  let triangle = []

  for (let i = 0; i < num_rows; i++) {

    triangle[i] = new Array(i+1)

    let length = triangle[i].length

    for (let idx = 0; idx < length; idx++) {

      let row = length - 1

      if (idx === 0 || idx === row) {

        triangle[row][idx] = 1

      } else {

        let row_above = row - 1
        let idx_prev = idx - 1

        triangle[row][idx] = triangle[row_above][idx_prev] + triangle[row_above][idx]

      }

    }

  }

  return triangle

}

function pascal_row (n) {

  let row = [1]

  for (let i = 0; i < n; i++) {

    let r = row[i]

    let n1 = n - i

    let ii = i + 1

    row.push(r * n1 / ii)

  }

  return row

}


console.log(pascal_row(9))

let binomials = create_triangle(10)
console.log(binomials)

function binomial (n, k) {

  while (n >= binomials.length) {
    let length = binomials.length
    let row = []
    row[0] = 1
    for (let i = 1, prev = length - 1; i < length; i++) {
      row[i] = binomials[prev][i - 1] + binomials[prev][i]
    }
    row[s] = 1
    binomials.push(row)
  }

  return binomials[n][k]

}

let calc = binomial(5, 2)
// console.log('calc', calc)