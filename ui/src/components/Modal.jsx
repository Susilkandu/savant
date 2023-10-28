import React from 'react'
import {RiCloseLine} from 'react-icons/ri'
import './Modal.css'
export default function Modal({setModalOpen}) {
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
      <div onClick={()=>{localStorage.removeItem('jwt')}} className="modalContent">
        Are you Really want to log Out?
      </div>
      <div className="modalActions">
        <button className="logOutBtn">Log Out</button>
        <button className='cancelBtn'>Cancel</button>
      </div>
    </div>
    </div>
    </div>
  )
}
