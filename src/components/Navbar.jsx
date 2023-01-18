import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  const {currentUser} = useContext(AuthContext)

  return (
    <div className='navbar'>
      <span className="logo">💌 APP Chat 📱</span>
      <div className="user">
        <div className='infoacc'>
        <img src={currentUser.photoURL} alt="" />
        <span className='username'>{currentUser.displayName}</span>
        </div>
        <div className='btnlogout'>
        <button onClick={()=>signOut(auth)}>logout</button>
        </div>
       
      </div>
    
    </div>
  )
}

export default Navbar