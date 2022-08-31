import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthFooter from './AuthFooter'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import { useSelector, useDispatch } from 'react-redux'
import { RootStore } from '../../utils/Typescript'
import { AUTH_MODAL } from '../../redux/types/authType'
import SocialLogin from './SocialLogin'

interface IProps {
   active?: string
}

const LoginModal = ({ active }: IProps) => {
   const [loginOrRegister, setLoginOrRegister] = useState<boolean>(true)
   const [loginNormal, setLoginNormal] = useState<boolean>(false)
   const { authModal } = useSelector((state: RootStore) => state)
   const dispatch = useDispatch()
   const authListLogin = [
      { text: 'Continue with Google', icon: 'fab fa-google', color: '#dc4e41' },
      { text: 'Continue with Facebook', icon: 'fab fa-facebook', color: '#3b5998' },
   ]
   useEffect(() => {
      return () => {
         setLoginOrRegister(true)
         setLoginNormal(false)
      }
   }, [])

   return (
      <div className={`auth_page ${active}`}>
         <div className="auth_overlay"></div>
         <div className="auth_box d-flex"
            style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}
         >
            <div className='auth_box-header w-100'>
               <span onClick={() => setLoginNormal(false)}>
                  <i className="fas fa-caret-left"></i>
               </span>
               <div className='close_auth'
                  onClick={() => dispatch({ type: AUTH_MODAL, payload: false })}
               >
                  <span>
                     &times;
                  </span>
               </div>
            </div>
            <h2 className='auth_box-title'>
               {
                  loginOrRegister ? 'Login Winter Video' : 'Register to Winter Video'
               }
            </h2>
            {
               loginNormal ?
                  <div className='auth-box-content w-100' style={{ flex: 1 }}>
                     {
                        loginOrRegister ?
                           <LoginForm />
                           :
                           <RegisterForm />
                     }
                  </div>
                  :
                  <div className='auth_list py-2 w-100' style={{ flex: 1 }}>
                     <div className='auth_list-item' onClick={() => setLoginNormal(true)}>
                        <i className='fas fa-user'></i>
                        <span>Phone number / Email / winterId</span>
                     </div>
                     <SocialLogin />
                  </div>
            }
            <AuthFooter loginOrRegister={loginOrRegister} setLoginOrRegister={setLoginOrRegister} />
         </div>
      </div>
   )
}
export default LoginModal