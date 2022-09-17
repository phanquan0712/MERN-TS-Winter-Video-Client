import React, { useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/authActions';
import { RootStore } from '../utils/Typescript';
import EditProfile from '../components/profile/EditProfile';

const Setting = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch<any>()
   const { auth } = useSelector((state: RootStore) => state)
   const [isEdit, setIsEdit] = useState<boolean>(false)

   return (
      <>
      <div className='setting'>
         <div className='setting_header'>
            <div className='go_back_profile' onClick={() => window.history.back()}>
               <ArrowBackIosIcon />
            </div>
            <h6 className='setting_title mb-0'>Privacy and settings</h6>
         </div>
         <div className='setting_content'>
            <div className="setting_content_item" onClick={() => setIsEdit(true)}>
               <h6 className='mb-0 setting_content_item-title'>Accounts</h6>
               <div className='setting_content_item_body'>
                  <PersonIcon />
                  <span>
                     Account Management
                  </span>
                  <KeyboardArrowRightIcon />
               </div>
            </div>
         <div className="setting_logout" onClick={() => dispatch(logout(auth))}>
            <LogoutIcon />
            <span>Log out</span>
         </div>
         </div>
      </div>
         {
            isEdit && 
            <div className='update_profile_mb'>
               <EditProfile setIsEdit={setIsEdit} user={auth.user} />
            </div>
         }
      </>
   )
}

export default Setting