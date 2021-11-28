import React, { useContext, useEffect,useState } from 'react'
import './register.css'
import Backdrop from '@mui/material/Backdrop';
import Alert from '@mui/material/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import { logincall, registercall } from '../Apicalls'
import { Authcontext } from '../contextApi/Authcontext'
import { useHistory } from "react-router-dom";
import { Redirect } from 'react-router'
function Register(props) {

   const [email,setemail ]=useState('')
   const [username,setusername ]=useState('')
   const [password,setpassword ]=useState('')
   const {user,isFetching,error,usertoken, dispatch}=useContext(Authcontext)
   let history=useHistory()
   let userName = props.user;
   let setUser=props.setUser;
const login=async()=>{
  await logincall({email,password},dispatch,setUser).then((res)=>{
    if(res){
        
        localStorage.setItem('token',usertoken);
        setUser(()=>{
          return res.exist._id;
        })
 
        // localStorage.setItem('userId',user._id);
        history.push('/home')
          
    }
  })
}


const register=async()=>{
  registercall({email,password,username},dispatch)

}
console.log(user)
console.log(usertoken)
if(user)
{
  localStorage.setItem('userId', user._id);
}

const loginshift=()=>{
  const sign_up_btn = document.querySelector("#sign-up-btn");
  const container = document.querySelector(".container");
  
    sign_up_btn.addEventListener("click", () => {
        container.classList.add("sign-up-mode");
      });
}


const signupshift=()=>{
  const sign_in_btn = document.querySelector("#sign-in-btn");
  const container = document.querySelector(".container");
  
    sign_in_btn.addEventListener("click", () => {
        container.classList.remove("sign-up-mode");
      });
}
useEffect(()=>{
  signupshift()
  loginshift()
},[])
 
// localStorage.setItem('user', "61968b4f0c29b8d174628d13");

    return (
      
        <div class="container">
        <div class="forms-container">
          <div class="signin-signup">
            <form  class="sign-in-form">
              <h2 class="title">Sign in</h2>
              <div class="input-field">
                <i class="fas fa-user"></i>
                <input type="text" placeholder="Email" value={email} onChange={(e)=>{setemail(e.target.value)}} />
              </div>
              <div class="input-field">
                <i class="fas fa-lock"></i>
                <input type="password" placeholder="Password" value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
              </div>
              <button   class="btn" onClick={login} type="button"> Login</button>
            </form>
            <form  class="sign-up-form">
              <h2 class="title">Sign up</h2>
              <div class="input-field">
                <i class="fas fa-user"></i>
                <input type="text" placeholder="Name" value={username} onChange={(e)=>{setusername(e.target.value)}}/>
              </div>
              <div class="input-field">
                <i class="fas fa-envelope"></i>
                <input type="email" placeholder="Email" value={email}  onChange={(e)=>{setemail(e.target.value)}}/>
              </div>
              <div class="input-field">
                <i class="fas fa-lock"></i>
                <input type="password" placeholder="Password" value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
              </div>
              <button  class="btn"   onClick={register} type="button"> Sign up</button> 
            </form>
          </div>
        </div>
  
        <div class="panels-container">
          <div class="panel left-panel">
            <div class="content">
              <h3>New here ?</h3>
              <p>
              Sign Up and login to continue!
              </p>
              <button class="btn transparent" id="sign-up-btn" onClick={signupshift}>
                Sign up
              </button>
            </div>
            <img src="img/log.svg" class="image" alt="" />
          </div>
          <div class="panel right-panel">
            <div class="content">
              <h3>One of us ?</h3>
              <p>
                Login with existing account to continue!
              </p>
              <button class="btn transparent" id="sign-in-btn"  onClick={loginshift}>
                Sign in
              </button>
            </div>
            <img src="img/register.svg" class="image" alt="" />
          </div>
          
        </div>
        <>
        {isFetching?
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
        
      >
        <CircularProgress color="inherit" />
      </Backdrop>:null
      }
      {
        
        error==false ?
        <div style={{"position":"absolute","width":"100%","zIndex":"10000"}}>
          <Alert severity="success"  variant="filled" >You have Successfully Signed In .  Login Now</Alert>
          </div>
        :error!=null?
        <div style={{"position":"absolute","width":"100%","zIndex":"10000"}}>
        <Alert severity="error" variant="filled">Something Went Wrong</Alert>
        </div>
        :null
      }
      </>
      </div>
  
    )
}

export default Register
