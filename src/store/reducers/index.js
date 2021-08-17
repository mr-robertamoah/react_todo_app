import {combineReducers} from 'redux'
import todoReducer from './TodoReducer'
import userReducer from './UserReducer'

const reducers = combineReducers({
    todos: todoReducer,
    user: userReducer
})

export default reducers