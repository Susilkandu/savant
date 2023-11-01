import React, { useContext} from 'react'
import { LoginContext } from '../context/LoginContex'
import logo from '../assets/icon.png'
import './Navbar.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './Home'
import SignUp from './SignUp'
import SignIn from './Signin'
import Profile from './Profile'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Createpost from './Createpost'
import Modal from './Modal'
export default function Navbar() {
  const { userLogin, modalOpen, setModalOpen } = useContext(LoginContext)
  let login = userLogin;
  const token = localStorage.getItem('jwt')
  const open = () => {
    setModalOpen(true)
  }
  const loginStatus = () => {
    if (token || login) {
      return (
        <>
          <Link to={'/profile'}><li>Profile</li></Link>
          <Link to={'/createPost'}><li>Create Post</li></Link>
          <Link to={""}>
            <button className='primaryBtn' onClick={open} >Log Out</button>
          </Link>
        </>
      )
    }
    else {
      return (
        <>
          <Link to={'/signup'}><li>SignUp</li></Link>
          <Link to={'/signin'}><li>SignIn</li></Link>
        </>
      )

    }
  }
  return (
    <BrowserRouter>
      <div className='navbar'>
        <img src={logo} alt="" />
        <ul className='nav-menu'>
          {loginStatus()}
        </ul>
      </div>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/signin' element={<SignIn />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/createPost' element={<Createpost />}></Route>
      </Routes>
      <ToastContainer theme="colored"/>
      {modalOpen && < Modal setModalOpen={setModalOpen} />}
    </BrowserRouter>
  )
}
