import { createStore, combineReducers } from 'redux'
import authReducer from './authenticated/reducers'

const reducers = combineReducers({
    authReducer
})

const store = createStore(reducers)

export default store