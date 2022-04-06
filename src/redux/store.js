import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'

import formReducer from './reducers/formReducer'
import userReducer from './reducers/userReducer'

const rootReducer = combineReducers({
    formReducer,
    userReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))