import { takeLatest, call, put } from 'redux-saga/effects'
import { handleApiErrors } from '../../lib/api-errors'
import { SIGNUP_REQUESTING, SIGNUP_SUCCESS, SIGNUP_ERROR, } from './constants'

// URL derived from .env file
const signupUrl = `${process.env.REACT_APP_API_URL}/api/Clients`

function signupApi ( email, password ) {

   // "fetch" is a native function made available by create-react-app polyfill
   return fetch ( signupUrl, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
   } )
      .then( handleApiErrors )
      .then( response => response.json() )
      .then( json => json )
      .catch( (error) => { throw error } )

}

// This will run when SIGNUP_REQUESTING 'action' is found by watcher
function* signupFlow ( action ) {

   try {

      const { email, password } = action

      // pulls "calls" to our signupApi with email and password from dispatched 'signup' action
      // will PAUSE until API async function is complete
      const response = yield call( signupApi, email, password )

      // when the above API call has completed it will PUT or dispatch and action type: SIGNUP_SUCCESS
      yield put( {type: SIGNUP_SUCCESS, response} )

   } catch (error) {
      yield put( {type: SIGNUP_ERROR, error} )
   }
   
}

// Watches for the SIGNUP_REQUESTING action type and will call 
// signupFlow() with the action we dispatched
function* signupWatcher () {

   // takeLatest() takes the latest call of the action and runs it
   // takeEvery() would take all actions and run them concurrently
   yield takeLatest( SIGNUP_REQUESTING, signupFlow )

}

export default signupWatcher