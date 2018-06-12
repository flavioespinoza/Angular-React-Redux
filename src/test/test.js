const log = require('ololog').configure({locate: false})

let f = () => {
  let i = 1
  return () => {
    console.log('i', i)
  }
}

f()




log.black('done')



// let f
//
// if (true) {
//
//   let i = 1
//
//   f = () => {
//
//     console.log('i', i)
//   }
// }
//
// f()