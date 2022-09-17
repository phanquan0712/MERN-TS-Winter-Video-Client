import React from 'react'
import { Link } from 'react-router-dom'
import LoginModal from '../components/auth/LoginForm'
import AuthModal from '../components/auth/AuthModal'
import { useSelector, useDispatch } from 'react-redux'


const Login = () => {
   return ( 
      <div className='auth_modal_mb'>
         <AuthModal active='active' />
      </div>
   )
}

export default Login