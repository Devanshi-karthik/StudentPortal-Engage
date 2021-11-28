import { FETCH_FAILURE, FETCH_POSTS, FETCH_SUCCESS } from "../Actions/Actions"


const Postreducer=(state,action)=>{
    switch(action.type){
        case FETCH_POSTS:
            return{
                posts:null,
                isFetching:true,
                error:null,
                
            }
        case FETCH_SUCCESS:
            return{
                posts:action.payload,
                isFetching:false,
                error:false,
                
            }
         case FETCH_FAILURE:
             return{
                 posts:null,
                 isFetching:false,
                 error:action.payload,
             }
        
         default:
             return state
    }
 }
 export default Postreducer