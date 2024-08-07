import { combineReducers } from 'redux'
import reducers from './reducers'

const rootReducer = () => {
  const appReducer = combineReducers(reducers())

  return (state, action) => appReducer(state, action)
}

export default rootReducer