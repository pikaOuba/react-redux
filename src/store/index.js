import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import common from './common'
import axios from '../utils/axios'

const rootReducer = combineReducers({
  common
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const fetch = (apiClient) => {
  return ({ dispatch, getState }) => {
    return (next) => {
      return (action) => {
        if (typeof action === 'function') {
          return action(dispatch, getState)
        }

        const { promise, types, ...rest } = action
        if (!promise) {
          return next(action)
        }

        const [REQUEST, SUCCESS, FAILURE] = types
        next({ ...rest, type: REQUEST })
        const actionPromise = promise(apiClient)
        actionPromise.then(response => {
          next({ ...rest, payload: response.payload, type: SUCCESS })
        }).catch(error => {
          next({ ...rest, error, type: FAILURE })
        })
        return actionPromise
      }
    }
  }
}

const enhancer = composeEnhancers(
  applyMiddleware(thunk, fetch(axios)),
  // other store enhancers if any
)
const store = createStore(rootReducer, enhancer)

export default store