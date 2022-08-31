import React from 'react'
import { Link } from 'react-router-dom'

interface IProps {
   loginOrRegister: boolean
   setLoginOrRegister: (loginOrRegister: boolean) => void
}

const AuthFooter = ({ loginOrRegister, setLoginOrRegister }: IProps) => {
   return (
      <div className='auth_box-footer py-2 w-100'
      style={{ borderTop: '1px solid #ccc'}}
   >
      <span>
         {
            loginOrRegister ? `Don't have an account?` : 'Already have an account?'
         }
         <strong className='ml-1' style={{ color: 'crimson', cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => setLoginOrRegister(!loginOrRegister)}
         >
            {
               loginOrRegister ? 'Register' : 'Login'
            }
         </strong>
      </span>
   </div>
   )
}

export default AuthFooter