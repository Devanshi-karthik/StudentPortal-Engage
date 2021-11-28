import { LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS, REGISTER_FAILURE, REGISTER_START, REGISTER_SUCCESS } from "../Actions/Actions";

const Authreducer=(state,action)=>{
   switch(action.type){
       case LOGIN_START:
           return{
               usertoken:null,
               isFetching:true,
               error:null,
               user:null
           }
       case LOGIN_SUCCESS:
           return{
               usertoken:action.payload,
               isFetching:false,
               error:false,
               user:null
           }
        case LOGIN_FAILURE:
            return{
                usertoken:null,
                isFetching:false,
                error:action.payload,
                user:null

            }
        case REGISTER_START:
            return{
                user:null,
               isFetching:true,
               error:null
            }
        case REGISTER_SUCCESS:
            return{
                user:action.payload,
                isFetching:false,
                error:false
            }
        case REGISTER_FAILURE:
            return{
                user:null,
                isFetching:false,
                error:action.payload
            }

        default:
            return state
   }
}
export default Authreducer