import axios from "axios";
import { FETCH_FAILURE, FETCH_POSTS, FETCH_SUCCESS, LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS, REGISTER_FAILURE, REGISTER_START, REGISTER_SUCCESS } from "./Actions/Actions";


export const logincall=async(credentials,dispatch,setUser)=>{
    dispatch({type:LOGIN_START})
    try{
        const response=await axios.post('http://localhost:5000/api/user/login', credentials)
        // setUser(() => {
        //     return response.data;
        // })
    
        dispatch({type : LOGIN_SUCCESS,payload:response.data.token})
        return response.data
    }catch(err){
        dispatch({type:LOGIN_FAILURE,payload:err})
        return false
    }

}

export const registercall=async(credentials,dispatch)=>{
    dispatch({type:REGISTER_START})
    try{
        const response=await axios.post('http://localhost:5000/api/user/register', credentials)
        dispatch({type : REGISTER_SUCCESS,payload:response.data})

    }catch(err){
        dispatch({type:REGISTER_FAILURE,payload:err})
    }

}

export const getallposts=async(dispatch)=>{
        dispatch({type:FETCH_POSTS})
    try{
        const response=await axios.get('http://localhost:5000/api/post')
        console.log(response.data)
        dispatch({type:FETCH_SUCCESS,payload:response.data})
    }
    catch(error){
        dispatch({type:FETCH_FAILURE,payload:error})
    }
}