import React from 'react'
import { useState } from 'react'
import logo from '../assets/icon.png'
import './SignUp.css'
import {Link, useNavigate} from 'react-router-dom'
import {  toast } from 'react-toastify'
export default function SignUp() {
  const navigate= useNavigate();
  const [name, setName]= useState("")
  const [username, setuserName]= useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const emailRegex= /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const passwordRegex= /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

  const postData= ()=>{
    // checking email
    if(!emailRegex.test(email))
    {
      toast.error("Please Enter Valid Email")
      return
    }else if(!passwordRegex.test(password))  //checking password
    {
      toast.error("Password length must be 8 and at least one digit, one special character , one symbol")
      return
    }
    // Sending Data body to the Server
    fetch("http://localhost:3000/signup",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,username,email,password
      })
    }).then(res=>res.json())
    .then(data=>{
      if(data.error)
      {
        toast.error(`${data.error}`)
      }
      else{
        toast.success(`${data.message}`)
        navigate("/signin")
      }
    })
  }
  return (
    <div className='signUp'>
      <div className="form-container">
      <div className="form">
      <img className='signUpLogo' src={logo} alt="" />
        <p className="loginPara">
          Sign up to connect with Your friends <br />
          And your Savant circle
        </p>
        <div>
          <input type="email" name='email' id='email' value={email}  onChange={(e)=>{setEmail(e.target.value)}} placeholder='Email'/>
        </div>
        <div>
          <input type="text" name='name' id='name' value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='Full name'/>
        </div>
        <div>
          <input type="text" name='username' id='username'value={username} onChange={(e)=>{setuserName(e.target.value)}} placeholder='Username' />
      </div>
        <div>
          <input type="password" name='password' id='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='password' />
        </div>
        <p className="loginPara" style={{fontSize:'12px'}}>
          By signin up, you agree to our Terms, <br /> and conditions of privacy and cookies policy.
        </p>
        <input type="submit" id='submit-btn' value={'Sign Up'} onClick={()=>{postData()}} />
        </div>
        <div className="form2">Already have an account ? <Link to='/signin'><span style={{color:'blue', cursor:'pointer'}}>Sign In</span></Link></div>
      </div>
    </div>
  )
}
