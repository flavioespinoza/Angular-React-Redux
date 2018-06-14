export function __display(number, digits) {

  let res
  let val
  let precision

  if (typeof number !== 'number') {
    val = Number(number) || 0
  } else {
    val = number
  }

  if (val === 0) {

    return '0.' + add_zeros(digits)
  }

  function add_zeros(length) {
    let result = ''
    for (let i = 0; i < length; i++) {
      result += '0'
    }
    return result
  }

  let re = new RegExp('(\\d+\\.\\d{' + digits + '})(\\d)')
  let m = val.toString().match(re)
  res = m ? parseFloat(m[1]) : val

  if ((res.toString()).split('.')[1]) {
    precision = (res.toString()).split('.')[1].length
  } else {
    precision = 4
  }


  if (precision < digits) {
    let length = digits - precision
    return res.toString() + add_zeros(length)
  }

  return res.toString()

}
