import { createContext, useReducer } from "react";
import Authreducer from "../Reducers/Authreducer";

const Init_state={
  user:null,
  isFetching:false,
  error:null,
  usertoken:null
}

export const Authcontext=createContext(Init_state)

export const Authcontextprovider=({children})=>{
      const [state,dispatch]= useReducer(Authreducer,Init_state)

      return(
         <Authcontext.Provider
         value={{
             user:state.user,
             isFetching:state.isFetching,
             error:state.error,
             usertoken:state.usertoken,
             dispatch
         }}
         >
         {children}
         </Authcontext.Provider>
      )
}