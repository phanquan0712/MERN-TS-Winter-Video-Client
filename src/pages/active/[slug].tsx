import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { postAPi } from '../../utils/FetchData'


const ActiveAccount = () => {
   const { slug } = useParams()
   const [successMsg, setSuccessMsg] = useState<string>('')
   const [errorMsg, setErrorMsg] = useState<string>('')

   useEffect(() => {
      postAPi('active', { active_token: slug })
         .then(res => setSuccessMsg(res.data.msg))
         .catch(err => setErrorMsg(err.response.data.msg))
   }, [])

   return (
      <div className='active_account'>
         <div className="active_box">
            <h2>Active Account</h2>
            {
               successMsg && <p className='success'>Success: {successMsg}, Now you can login</p>
            }
            {
               errorMsg && <p className='error'>Error: {errorMsg}, try again</p>
            }
            <Link to='/'>
               Return to Homepage
            </Link>
         </div>
      </div>
   )
}

export default ActiveAccount