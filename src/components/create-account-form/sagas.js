import { take, fork, cancel, call, put, cancelled } from 'redux-saga/effects'

// use function to redirect routes based on cases
import history from '../history/history'

// Import API error handler
import { handleApiErrors } from '../../lib/api-errors'

// signup constants
import {
   SIGNUP_REQUESTING,
   SIGNUP_SUCCESS,
   SIGNUP_ERROR,
   SIGNUP_CLEAR,
} from './constants'

import { signupSuccess, signupError } from './actions'


function* signupFlow ( username, password ) {
  console.log( username + password)

  yield put( signupSuccess({ username, password }) )
 
}

function* signupWatcher () {
   while( true ) {

      const { username, password } = yield take( SIGNUP_REQUESTING )
      const signupTask = yield fork( signupFlow, username, password)
      const action = yield take( SIGNUP_SUCCESS )
      if( action.type === SIGNUP_SUCCESS) { 
        history.push('/signup-success') 
      }
      else {
        signupError( {error: "error submitting"} )
      }
      yield cancel ( signupTask )
   }
}

export default signupWatcher