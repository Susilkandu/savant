import Navbar from './components/Navbar'
import React, {createContext, useContext, useState} from 'react'
import { LoginContext } from './context/LoginContex'
import './App.css'
function App() {
const [userLogin, setUserLogin] = useState(false)
const [modalOpen, setModalOpen] = useState(false)
const [viewcomment, setViewcomment] = useState(false)
  return (
    <>
    <LoginContext.Provider value={{setUserLogin, setModalOpen, modalOpen, userLogin,viewcomment,setViewcomment}}>
    <Navbar />
    </LoginContext.Provider>
    </>
  )
}

export default App
