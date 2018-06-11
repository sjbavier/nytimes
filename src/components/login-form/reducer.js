import {
   LOGIN_REQUESTING,
   LOGIN_SUCCESS,
   LOGIN_ERROR,
   LOGIN_CLEAR,
} from './constants'

const initialState = {
   requesting: false,
   successful: false,
   messages: [],
   errors: [],
   username: "",
   password: "",
}

const reducer = function loginReducer ( state = initialState, action ) {
   switch ( action.type ) {
      // set requesting - append message shown
      case LOGIN_REQUESTING:
         return {
            requesting: true,
            successful: false,
            messages: [ { body: 'Logging in...', time: new Date() } ],
            errors: [],
            username: "",
            password: "",
         }
      // Successful Login? reset requesting property to false
      case LOGIN_SUCCESS:
         return {
            errors: [],
            messages: [],
            requesting: false,
            successful: true,
            username: action.username,
            password: action.password,
         }
      // return error and reset requesting property to false
      case LOGIN_ERROR:
         return {
            errors: state.errors.concat([{
               body: action.error.toString(),
               time: new Date(),
            }]),
            messages: [],
            requesting: false,
            successful: false,
            username: "",
            password: "",
         }
      case LOGIN_CLEAR:
         return {
            requesting: false,
            successful: false,
            messages: [],
            errors: [],
            username: "",
            password: "",
         }
      default:
         return state
   }
}


export default reducer