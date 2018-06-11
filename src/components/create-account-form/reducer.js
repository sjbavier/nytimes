import { 
   SIGNUP_REQUESTING,
   SIGNUP_SUCCESS,
   SIGNUP_ERROR, 
} from './constants'


const initialState = {
   requesting: false,
   successful: false,
   messages: [],
   errors: [],
   username: "",
   password: "",
}

const reducer = function signupReducer ( state = initialState, action ) {

   switch ( action.type ) {

      case SIGNUP_REQUESTING:
         return {
            requesting: true,
            successful: false,
            messages: [{ body: 'Signing up...', time: new Date() }],
            errors: [],
            username: "",
            password: "",
         }

      case SIGNUP_SUCCESS:
         return {
            errors: [],
            messages: [{
               body: `Successfully created account for ${action.username}`,
               time: new Date(),
            }],
            requesting: false,
            successful: true,
            username: action.username,
            password: action.password,
         }

      case SIGNUP_ERROR:
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
         
      default:
         return state

   }

}

export default reducer