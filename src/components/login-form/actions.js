import { LOGIN_REQUESTING, LOGIN_CLEAR, LOGIN_SUCCESS, LOGIN_ERROR } from './constants'

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

export const loginSuccess = function loginSuccess({ username, password }) {
    return {
        type: LOGIN_SUCCESS,
        username,
        password,
    }
}
export const loginError = function loginError({ error }) {
    return {
        type: LOGIN_ERROR,
        error,
    }
}


export default loginRequest