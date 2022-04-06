import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'

import formReducer from './reducers/formReducer'
import userReducer from './reducers/userReducer'
import postReducer from './reducers/postReducer'

const rootReducer = combineReducers({
    formReducer,
    userReducer,
    postReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))