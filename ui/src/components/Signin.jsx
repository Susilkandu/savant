import React from 'react'
import { useState } from 'react'
import logo from '../assets/icon.png'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import './Signin.css'
import { toast } from 'react-toastify'
export default function SignIn() {
  const navigate= useNavigate(); 
  const [email,setEmail]= useState("")
  const [password,setPassword] = useState("")
  const emailRegex= /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const postData = ()=>{

    // checking email
    if(!emailRegex.test(email))
    {
      toast.error("Please Enter Valid Email")
      return
    }
    else
    {
    fetch("http://localhost:8000/signin",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email,password
      })
    }).then((res)=>res.json())
    .then((data)=>{
      if(data.error)
      {
        toast.error(data.error)
      }else
      {
        toast.success(data.message)
        navigate("/")
      }
    })
    }
  }
  return (
  <div className="signin">
    <div className="loginForm">
    <img className='signUpLogo' src={logo} alt="" />
    <div>
      <input type="email" name='email' placeholder='Email' value={email} onChange={(e)=>{setEmail(e.target.value)}}  />
    </div>
    <div>
      <input type="password" name='password' placeholder='Password' value={password} onChange={(e)=>{setPassword(e.target.value)}} />
      </div>
    <input type="submit" id='login-btn' value={'Log in'} onClick={postData} />
    <div className="loginform2">
      <p>Don't have an account? <Link to='/signup'><span style={{color:'blue'}}>Sign Up</span></Link></p>
    </div>
    </div>
    
  </div>      
  )
}
