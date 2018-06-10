import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import login from './components/login-form/reducer'
const IndexReducer = combineReducers({
   form,
    login,
})

export default IndexReducer