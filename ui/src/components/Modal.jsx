import React ,{useContext}from 'react'
import {RiCloseLine} from 'react-icons/ri'
import './Modal.css'
import { LoginContext } from '../context/LoginContex'
export default function Modal() {
  const {setUserLogin, setModalOpen, userLogin,} = useContext(LoginContext)
  const logout=()=>{
    console.log(userLogin)
    localStorage.removeItem('jwt') 
    setModalOpen(false)
    setUserLogin(false)
      console.log(userLogin)
  }
    return (
    <div className="darkBg">
        <div className="centered">
        <div className='modal'>
      <div className="modalHeader">
        <h5 className="heading">Confirm</h5>
      </div>
      <button  className='closeBtn'>
        <RiCloseLine></RiCloseLine>
      </button>
      <div  className="modalContent">
        Are you Really want to log Out?
      </div>
      <div className="modalActions">
        <button className="logOutBtn" onClick={()=>{logout()}}>Log Out</button>
        <button className='cancelBtn' onClick={()=>{setModalOpen(false)}}>Cancel</button>
      </div>
    </div>
    </div>
    </div>
  )
}
