import React, { useEffect, useState } from 'react'
import { IUser } from '../../utils/Typescript'
import { RootStore } from '../../utils/Typescript'
import { useDispatch, useSelector } from 'react-redux'
import { follow, unfollow } from '../../redux/actions/userActions'

interface IProps {
   user: IUser
}

const FollowBtn = ({ user }: IProps) => {
   const [followed, setFollowed] = useState<boolean>(false)
   const dispatch = useDispatch<any>()
   const { auth, profileUser } = useSelector((state: RootStore) => state)

   useEffect(() => {
      if(auth.user && auth.user.following.find(item => item?._id === user?._id)) {
         setFollowed(true)
      }
      return () => setFollowed(false)
   }, [auth.user?.following, user])

   const hanleFollow = () => {
      setFollowed(true)
      dispatch(follow(user, auth))
   }

   const handleUnFollow = () => {
      setFollowed(false)
      dispatch(unfollow(user, auth))
   }


   return (
      <>
         {
            followed ?
               <div className='d-flex align-items-center'>
                  <button className="btn btn-outline-info mr-2"
               >
                  Message
               </button>
                  <button className="btn btn-outline-danger"
                     onClick={handleUnFollow}
                  >
                     <svg width="20" height="20" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.0001 13C13.0001 9.68629 15.6864 7 19.0001 7C22.3139 7 25.0001 9.68629 25.0001 13C25.0001 16.3137 22.3139 19 19.0001 19C15.6864 19 13.0001 16.3137 13.0001 13ZM19.0001 3C13.4773 3 9.00015 7.47715 9.00015 13C9.00015 18.5228 13.4773 23 19.0001 23C24.523 23 29.0001 18.5228 29.0001 13C29.0001 7.47715 24.523 3 19.0001 3ZM5.19435 40.9681C6.70152 35.5144 10.0886 32.2352 13.9162 30.738C17.7125 29.2531 22.0358 29.4832 25.6064 31.2486C26.1015 31.4934 26.7131 31.338 26.9931 30.8619L28.0072 29.1381C28.2872 28.662 28.1294 28.0465 27.6384 27.7937C23.0156 25.4139 17.4034 25.0789 12.4591 27.0129C7.37426 29.0018 3.09339 33.3505 1.2883 40.0887C1.14539 40.6222 1.48573 41.1592 2.02454 41.2805L3.97575 41.7195C4.51457 41.8408 5.04724 41.5004 5.19435 40.9681ZM44.7074 30.1212C45.0979 29.7307 45.0979 29.0975 44.7074 28.707L43.2932 27.2928C42.9026 26.9023 42.2695 26.9023 41.8789 27.2928L30.0003 39.1715L25.1216 34.2928C24.7311 33.9023 24.0979 33.9023 23.7074 34.2928L22.2932 35.707C21.9026 36.0975 21.9026 36.7307 22.2932 37.1212L28.586 43.4141C29.3671 44.1952 30.6334 44.1952 31.4145 43.4141L44.7074 30.1212Z"></path></svg>
                  </button>
               </div>
               :
               <button className="btn btn-outline-info"
                  onClick={hanleFollow}
               >
                  Follow
               </button>
         }
      </>
   )
}

export default FollowBtn