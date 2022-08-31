import React, { useEffect, useState } from 'react'
import { FormSubmit, InputChange } from '../../utils/Typescript'
import { IUserRegister  } from '../../utils/Typescript'
import { useDispatch } from 'react-redux'
import { register } from '../../redux/actions/authActions'


const LoginForm = () => {
   const [phoneOrEmail, setPhoneOrEmail] = useState<boolean>(false)
   const initState = {
      winterId: '',
      account: '',
      name: '',
      password: '',
      cf_password: '',
   }
   const [typePass, setTypePass] = useState<boolean>(false)
   const [typeCfPass, setTypeCfPass] = useState<boolean>(false)
   const [userRegister, setUserRegister] = useState<IUserRegister>(initState)
   const dispatch = useDispatch<any>()
   const handleChangeInput = (e: InputChange) => {
      const { name, value } = e.target as HTMLInputElement
      setUserRegister({ ...userRegister, [name]: value })
   }

   const handleSubmit = (e: FormSubmit) => {
      e.preventDefault()
      dispatch(register(userRegister))
   }

   useEffect(() => {
      return () => {
         setUserRegister(initState)
         setPhoneOrEmail(false)
      }
   }, [])
   return (
      <form onSubmit={handleSubmit}>
         <div className="mb-3">
            <div className="mb-3">
               <label htmlFor="exampleInputwinterid" className="form-label">WinterId</label>
               <input type="text" className="form-control" id="exampleInputwinterid"
                  name='winterId'
                  onChange={handleChangeInput}
                  placeholder='eg: winter00001'
               />
            </div>
            <div className="mb-3">
               <label htmlFor="exampleInputName" className="form-label">Name</label>
               <input type="text" className="form-control" id="exampleInputName"
                  name='name'
                  onChange={handleChangeInput}
                  placeholder='eg: Winter John'
               />
            </div>
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
                        <input type="text" className="form-control" id="exampleInputPhoneNumber"
                           name='account'
                           onChange={handleChangeInput}
                           placeholder='eg: +84123456789'
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
                        <input type="email" className="form-control" id="exampleInputEmail1"
                           name='account'
                           onChange={handleChangeInput}
                           placeholder='eg: winter00001@wintervideo.com'
                        />
                     </>
               }
            </div>
         </div>
         <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <div className='pass'>
               <input type={typePass ? 'text' : 'password'}
                  className="form-control"
                  id="exampleInputPassword1"
                  name='password'
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
         <div className="mb-3">
            <label htmlFor="exampleInputCfPassword1" className="form-label">Confirm Password</label>
            <div className='pass'>
               <input type={typeCfPass ? 'text' : 'password'}
                  className="form-control"
                  id="exampleInputCfPassword1"
                  name='cf_password'
                  onChange={handleChangeInput}
               />
               <small onClick={() => setTypeCfPass(!typeCfPass)}>
                  {
                     typeCfPass ?
                        <i className="far fa-eye-slash"></i>
                        :
                        <i className="fas fa-eye"></i>
                  }
               </small>
            </div>
         </div>

         <button type="submit" className="btn btn-dark w-100 mt-3">Register</button>
      </form>
   )
}

export default LoginForm