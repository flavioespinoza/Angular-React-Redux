const Chance = require('chance')
const chance = new Chance()
const log = require('ololog').configure({
  locate: false
})

export default function reducer (state = {

  hello_msg: 'Hello Ren!',
  data: [],
  count: 0,

}, action) {

  switch (action.type) {

    case 'SET_HELLO_MESSAGE': {
      // log.blue('SET_HELLO_MESSAGE', action.payload)
      return {
        ...state,
        hello_msg: action.payload
      }
    }
    case 'SET_DATA': {
      // log.green('SET_DATA', JSON.stringify(action.payload))
      return {
        ...state,
        data: action.payload,
      }
    }
    case 'INCREMENT_COUNT': {
      log.red('INCREMENT_COUNT', JSON.stringify(action.payload))
      return {
        ...state,
        count: action.payload,
      }
    }
  }

  return state

}