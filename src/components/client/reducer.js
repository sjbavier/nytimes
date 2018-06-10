import { CLIENT_SET, CLIENT_UNSET } from './constants'

const initialState = {
   id: null,
   token: null,
   groups: [],
}

const reducer = function clientReducer ( state = initialState, action ) {

      switch( action.type ){

         case CLIENT_SET:
            return {
               id: action.token.userID,
               token: action.token,
               groups: action.userGroups,
            }

         case CLIENT_UNSET:
            return {
               id: null,
               token: null,
               groups: [],
            }

         default:
            return state
            
      }
      
}

export default reducer