import { createContext, useReducer } from "react";
import Postreducer from "../Reducers/Postreducer";


const Init_state={
  posts:null,
  isFetching:false,
  error:null,
  
}

export const Postcontext=createContext(Init_state)

export const Postcontextprovider=({children})=>{
      const [state,dispatch]= useReducer(Postreducer,Init_state)

      return(
         <Postcontext.Provider
         value={{
             posts:state.posts,
             isFetching:state.isFetching,
             error:state.error,
             dispatch
         }}
         >
         {children}
         </Postcontext.Provider>
      )
}