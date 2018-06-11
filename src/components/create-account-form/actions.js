import { SIGNUP_REQUESTING, SIGNUP_SUCCESS, SIGNUP_ERROR } from './constants'

const signupRequest = function signupRequest( { username, password } ){
   return {
      type: SIGNUP_REQUESTING,
      username,
      password,
   }
}

export const signupSuccess = function signupSuccess({ username, password }) {
    return {
        type: SIGNUP_SUCCESS,
        username,
        password,
    }
}

export const signupError = function signupError({ error }) {
    return {
        type: SIGNUP_ERROR,
        error,
    }
}

export default signupRequest