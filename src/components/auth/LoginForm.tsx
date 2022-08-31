import React, { useState, useEffect } from 'react'
import { FormSubmit, InputChange } from '../../utils/Typescript'
import { IUserLogin } from '../../utils/Typescript'
import { login, verifySms } from '../../redux/actions/authActions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AUTH_MODAL } from '../../redux/types/authType'
import { loginSms } from '../../redux/actions/authActions'

const LoginForm = () => {
   const [phoneOrEmail, setPhoneOrEmail] = useState<boolean>(false)
   const [smsOrPassword, setSmsOrPassword] = useState<boolean>(false)
   const [smsOTP, setSmsOTP] = useState<string>('')
   const dispatch = useDispatch<any>();
   const { alert } = useSelector((state: any) => state)
   const navigate = useNavigate();
   const initState = {
      account: '',
      password: '',
   }
   const [typePass, setTypePass] = useState<boolean>(false)
   const [userLogin, setUserLogin] = useState<IUserLogin>(initState)

   const handleChangeInput = (e: InputChange) => {
      const { name, value } = e.target as HTMLInputElement
      setUserLogin({ ...userLogin, [name]: value })
   }

   const handleSubmit = (e: FormSubmit) => {
      e.preventDefault()
      if(phoneOrEmail && smsOrPassword) {
         return dispatch(verifySms(userLogin.account, smsOTP))
      }
      dispatch(login(userLogin))
   }

   useEffect(() => {
      return () => {
         setUserLogin(initState)
         setPhoneOrEmail(false)
      }
   }, [])

   const handleSendCode = () => {
      if(phoneOrEmail && smsOrPassword) {
         dispatch(loginSms(userLogin.account))
      }
   }

   return (
      <form onSubmit={handleSubmit}>
         <div className="mb-3">
            <div>
               {
                  phoneOrEmail ?
                     <>
                        <div className='d-flex align-items-center justify-content-between'>
                           <label htmlFor="exampleInputPhoneNumber" className="form-label">Phone</label>
                           <small style={{ cursor: 'pointer' }}
                              onClick={() => setPhoneOrEmail(false)}
                           >
                              Login with email
                           </small>
                        </div>
                        <input type="text" name='account' className="form-control" id="exampleInputPhoneNumber"
                           onChange={handleChangeInput}
                        />
                     </>
                     :
                     <>
                        <div className='d-flex align-items-center justify-content-between'>
                           <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                           <small style={{ cursor: 'pointer' }}
                              onClick={() => setPhoneOrEmail(true)}
                           >
                              Login with phone number
                           </small>
                        </div>
                        <input type="email" name='account' className="form-control" id="exampleInputEmail1"
                           onChange={handleChangeInput}
                        />
                     </>
               }
            </div>
         </div>
         {
            !smsOrPassword ?

               <div className="mb-3">
                  <div className='d-flex align-items-center justify-content-between'>
                     <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                     {
                        phoneOrEmail &&
                        <small style={{ cursor: 'pointer' }}
                           onClick={() => setSmsOrPassword(true)}
                        >
                           Login with code OTP
                        </small>
                     }
                  </div>
                  <div className='pass'>
                     <input type={typePass ? 'text' : 'password'}
                        className="form-control"
                        id="exampleInputPassword1"
                        name='password'
                        value={userLogin.password}
                        onChange={handleChangeInput}
                     />
                     <small onClick={() => setTypePass(!typePass)}>
                        {
                           typePass ?
                              <i className="far fa-eye-slash"></i>
                              :
                              <i className="fas fa-eye"></i>
                        }
                     </small>
                  </div>
               </div>
               :
               <div className="mb-3">
                  <div className='d-flex align-items-center justify-content-between'>
                     <label htmlFor="exampleInputOTP" className="form-label">Code OTP</label>
                     <small style={{ cursor: 'pointer' }}
                        onClick={() => setSmsOrPassword(false)}
                     >
                        Login with password
                     </small>
                  </div>
                  <div className='code_otp d-flex align-items-center'>
                     <input type='text'
                        className="form-control"
                        id="exampleInputOTP"
                        value={smsOTP}
                        style={{ flex: 1 }}
                        onChange={(e) => setSmsOTP(e.target.value)}
                     />
                     <span className='btn btn-danger' onClick={handleSendCode}>send Code</span>
                  </div>
               </div>
         }
         <button type="submit"
            disabled={!userLogin.account || (!userLogin.password && !smsOTP)}
            className="btn btn-dark w-100 mt-3">Login</button>
      </form>
   )
}

export default LoginForm