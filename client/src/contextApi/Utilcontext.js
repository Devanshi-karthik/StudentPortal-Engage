import { createContext, useReducer } from "react";

const Init_state={
  drawer:false
}

export const Utilcontext=createContext(Init_state)

export const Utilcontextprovider=({children})=>{
      const [state,dispatch]= useReducer(Utilreducer,Init_state)

      return(
         <Utilcontext.Provider
         value={{
             drawer:state.drawer,
             dispatch
         }}
         >
         {children}
         </Utilcontext.Provider>
      )
}