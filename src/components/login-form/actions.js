import { LOGIN_REQUESTING, LOGIN_CLEAR } from './constants'

// to perform action type LOGIN_REQUESTING we need username and password
const loginRequest = function loginRequest( {username, password } ) {
   return {
      type: LOGIN_REQUESTING,
      username,
      password,
   }
}

const loginClear = function loginClear() {
   return {
      type: LOGIN_CLEAR,
   }
}

export default loginRequest