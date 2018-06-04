import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import reducer from '../reducers/reducer'
import * as actions from '../actions/actions'


const middleware = applyMiddleware(promise(), thunk.withExtraArgument({ actions }))

export default createStore(reducer, middleware)