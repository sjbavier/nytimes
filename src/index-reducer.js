import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import login from './components/login-form/reducer'
import signup from './components/create-account-form/reducer'
const IndexReducer = combineReducers({
    form,
    login,
    signup,
})

export default IndexReducer