import React, { useState } from 'react'
import Avatar from '../../components/global/Avatar'
import { InputChange, IUser } from '../../utils/Typescript'
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../redux/actions/userActions';
import { RootStore } from '../../utils/Typescript';


interface IProps {
   setIsEdit: (isEdit: boolean) => void
   user: IUser
}

const EditProfile = ({ setIsEdit, user }: IProps) => {
   const dispatch = useDispatch<any>()
   const { auth } = useSelector((state: RootStore) => state)
   const initState = {
      winterId: user.winterId,
      name: user.name,
      avatar: user.avatar,
      story: user.story,
   }
   const [userData, setUserData] = useState<{
      winterId: string,
      name: string,
      avatar: string | File,
      story: string,
   }>(initState)
   const  { winterId, name, avatar, story } = userData
   const handleChangeInput = (e: InputChange) => {
      const { name, value } = e.target as HTMLInputElement
      setUserData({ ...userData, [name]: value })
   }

   const handleChangeImage = (e: InputChange) => {
      const taget = e.target as HTMLInputElement
      const files = taget.files
      if(files) {
         const file = files[0]
         setUserData({ ...userData, avatar: file })
      }
   }

   return (
      <div className='edit_profile'>
         <div className="edit_profile_box">
            <div className='edit_profile_header'>
               <h3>Edit Profile</h3>
               <div onClick={() => setIsEdit(false)}>
                  &times;
               </div>
            </div>
            <div className='edit_profile_content'>
               <div className='edit_profile_content_item'>
                  <div className='mr-2'>
                     Avatar profile
                  </div>
                  <div style={{ width: 'max-content', marginLeft: '124px' }} className='edit_avatar'>
                     <Avatar src={typeof(avatar) === 'string' ? avatar : URL.createObjectURL(avatar)} size='bigMoreThan' />
                     <span>
                        <BorderColorOutlinedIcon />
                        <input
                           title=''
                           type="file"
                           accept='image/*'
                           name='file'
                           id='file_up'
                           onChange={handleChangeImage}
                        />
                     </span>
                  </div>
               </div>
               <div className='edit_profile_content_item'>
                  <div className='mr-2'>
                     Winter ID
                  </div>
                  <div style={{ width: 'max-content', marginLeft: '0' }}>
                     <input type="text" className='form-control p-2' value={winterId} style={{ background: '#eee', color: '#333' }}
                        name = 'winterId'
                        onChange={handleChangeInput}
                     />
                     <p style={{ maxWidth: '300px', marginTop: '25px', marginBottom: '0', fontSize: '14px', color: '#999' }}>
                        Winter ID can only contain letters, numbers, underscores, and periods. When you change your Winter ID, your profile link will also change.
                     </p>
                  </div>
               </div>
               <div className='edit_profile_content_item'>
                  <div className='mr-2'>
                     Name
                  </div>
                  <div style={{ width: 'max-content', marginLeft: '0' }}>
                     <input type="text" className='form-control p-2' value={name} style={{ background: '#eee', color: '#333', width: '300px' }}
                        name = 'name'
                        onChange={handleChangeInput}
                     />
                  </div>
               </div>
               <div className='edit_profile_content_item'>
                  <div className='mr-2'>
                     Story
                  </div>
                  <div style={{ width: 'max-content', marginLeft: '0' }}>
                     <textarea
                        cols={40}
                        rows={4}
                        className='form-control'
                        value={story}
                        name='story'
                        onChange={handleChangeInput}
                        style={{
                           maxWidth: '300px',
                           border: 'none',
                           outline: 'none',
                           background: '#eee',
                           color: '#333',
                           padding: '10px',
                           resize: 'none'
                        }}
                     />

                  </div>
               </div>
            </div>
            <div className='text-right p-3 mr-4'>
               <button className='btn btn-outline border'
                  onClick={() => setIsEdit(false)}
               >Cancel</button>
               <button className='btn btn-dark ml-3'
                  onClick={() => dispatch(updateUser(userData, auth))}
               >Save</button>
            </div>
         </div>
      </div>
   )
}

export default EditProfile