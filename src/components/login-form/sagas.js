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

// for modifying Client state
import {
   setClient,
   unsetClient,
} from '../client/actions'
import loginClear from './actions'
import {
   CLIENT_UNSET
} from '../client/constants'


const loginUrl = `${process.env.REACT_APP_API_URL}/auth/ldap`
const adUrl = `${process.env.REACT_APP_AD_API}/auth`

function loginAPI ( username, password ) {

   console.log(adUrl)
   return fetch( loginUrl , {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify( { username, password } ),
      accept: 'application/json'
   })
   .then( handleApiErrors )
   .then( response => response.json() )
   .then( json => json )
   .catch( (error) => { throw error } )
}

function* logout () {

   // dispatch CLIENT_UNSET action
   yield put( unsetClient() )
   
   // remove token
   localStorage.removeItem( 'token' )

   yield put( { type: LOGIN_CLEAR } )

}

function* loginFlow ( username, password, token, requestedURL ) {
   if( token ){
      console.log("within loginFlow with token: " + token )
      // in future create secure authentication try catch
      token = JSON.parse(token)
      console.log(token)
         if( token.authenticated ) { 
            yield put( { type: LOGIN_SUCCESS } )
            history.push('/app')
          } else {
             yield put( { type: LOGIN_ERROR } )
          }
   }
   else {
      let token

         try {

            // try to call loginApi it will pause until successful or error received
            token = yield call( loginAPI, username, password )
            // inform Redux to set client token - this is non-blocking
            yield put( setClient( token ) )

            // inform Redux that login was successful
            yield put( { type: LOGIN_SUCCESS } )

            // set stringified version of our token in localstorage
            localStorage.setItem( 'token', JSON.stringify( token ) )

            // redirect to directory
            history.push( '/app' )

         } catch (error) {

            // error send to Redux
            yield put( {type: LOGIN_ERROR, error })

         } finally {

            // no matter what if forked task was cancelled then redirect to login
            if ( yield cancelled() ){
               history.push( '/login' )
            }

         }
   }
   // return the token
   return token

}

function* loginWatcher () {
   while( true ) {

      // generator will pause and wait for the `LOGIN_REQUESTING` action to pull the `username` and `password`
      const { username, password, token, requestedURL } = yield take( LOGIN_REQUESTING )

      // fork method spins up another "process" passing `username` and `password` to loginFlow() to execute in the background
      // without blocking loop.  The reference to this forked task is stored in `task` for easy management
      const task = yield fork( loginFlow, username, password, token, requestedURL ) // as the forked process is initiated the execution moves forward

      // saga here is watching for the action of either logging out or an error
      const action = yield take( [CLIENT_UNSET, LOGIN_ERROR] )

      // if the client attempts to logout during the login process this will cancel the forked task
      if( action.type === CLIENT_UNSET ) yield cancel( task )

      // this will log the client out and unset the client access token
      yield call( logout )
   }
}

export default loginWatcher