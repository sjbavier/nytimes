import { take, fork, cancel, call, put, cancelled } from 'redux-saga/effects'

// use function to redirect routes based on cases
import history from '../history/history'

// Import API error handler
import { handleApiErrors } from '../../lib/api-errors'

// Login constants
import {
   LOGIN_REQUESTING,
   LOGIN_SUCCESS,
   LOGIN_ERROR,
   LOGIN_CLEAR,
} from './constants'

import { loginSuccess, loginError } from './actions'


function* loginFlow ( username, password ) {
  console.log( username + password)

  yield put( loginSuccess({ username, password }) )
 
}

function* loginWatcher () {
   while( true ) {

      const { username, password } = yield take( LOGIN_REQUESTING )
      const loginTask = yield fork( loginFlow, username, password)
      const action = yield take( LOGIN_SUCCESS )
      if( action.type === LOGIN_SUCCESS) { 
        history.push('/login-success') 
      }
      else {
        loginError( {error: "error submitting"} )
      }
      yield cancel( loginTask )
   }
}

export default loginWatcher