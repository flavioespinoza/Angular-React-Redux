import store from '../stores/store'

export function setHelloMessage(__hello_msg) {

  return {
    type: 'SET_HELLO_MESSAGE',
    payload: __hello_msg
  }
}

export function pushData(__item) {

  let data = store.getState().data
  data.push(__item)

  return {
    type: 'SET_DATA',
    payload: data
  }


}

export function setData(__data) {
  return {
    type: 'SET_DATA',
    payload: __data
  }
}

export function incramentCount(__num) {
  // console.log('__num', __num)
  return {
    type: 'INCREMENT_COUNT',
    payload: __num
  }
}