import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'

import formReducer from './reducers/formReducer'
import userReducer from './reducers/userReducer'
import postReducer from './reducers/postReducer'
import cmtReducer from './reducers/cmtReducer'

const rootReducer = combineReducers({
    formReducer,
    userReducer,
    postReducer,
    cmtReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
