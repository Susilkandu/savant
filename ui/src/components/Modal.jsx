import React ,{useContext}from 'react'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {RiCloseLine} from 'react-icons/ri'
import './Modal.css'
import { LoginContext } from '../context/LoginContex'
export default function Modal() {
  const navigate = useNavigate();
  const {setUserLogin, setModalOpen, userLogin,} = useContext(LoginContext)
  const logout=()=>{
    console.log(userLogin)
    localStorage.removeItem('jwt') 
    setUserLogin(false)
    setModalOpen(false)
    toast.success('logut')
    navigate('/signup')

  }
    return (
    <div className="darkBg" onClick={()=>{setModalOpen(false)}}>
        <div className="centered">
        <div className='modal'>
      <div className="modalHeader">
        <h5 className="heading">Confirm</h5>
      </div>
      <button  className='closeBtn' onClick={()=>{setModalOpen(false)}}>
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
