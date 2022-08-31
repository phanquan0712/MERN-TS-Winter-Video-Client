import React, { useEffect, useState } from 'react'
import LeftSide from '../../components/home/leftSide'
import { useSelector, useDispatch } from 'react-redux'
import { RootStore, IPost, IPostThumb } from '../../utils/Typescript'
import Avatar from '../../components/global/Avatar'
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import EditProfile from '../../components/profile/EditProfile'
import { useParams } from 'react-router-dom'
import { IParams, IUser } from '../../utils/Typescript'
import { getProfileUser } from '../../redux/actions/userActions'
import FollowBtn from '../../components/global/FollowBtn'
import PostThumb from '../../components/profile/PostThumb'

const ProfileUser = () => {
   const { slug }: IParams = useParams()
   const dispatch = useDispatch<any>()
   const { auth, profileUser } = useSelector((state: RootStore) => state)
   const NavProfileLink = ['Video', 'Liked']
   const [active, setActive] = useState<string>(NavProfileLink[0])
   const [isEdit, setIsEdit] = useState<boolean>(false)
   const [userProfile, setUserProfile] = useState<IUser>()
   useEffect(() => {
      if (profileUser.users.every(item => item._id !== slug)) {
         dispatch(getProfileUser((slug as string)))
      } else {
         setUserProfile(profileUser.users.find(item => item._id === slug))
      }
      return () => {
         setUserProfile(undefined)
      }
   }, [slug, profileUser.users])


   if (!auth.user) return;
   if (!userProfile) return;
   return (
      <div className='profile_user d-flex'
         style={{ marginLeft: 0, marginRight: 0 }}
      >
         <div style={{ width: '340px', height: 'auto'}}>
            <LeftSide />
         </div>
         <div className="user_page" style={{
            width: 'calc(100% - 350px)',
         }}>
            <div className="py-3 px-4 right_side-profile">
               <div className="profile_user_info d-flex align-items-center">
                  <Avatar src={userProfile.avatar} size='super' />
                  <div className='ml-2'>
                     <h4 style={{
                        fontSize: '24px', fontWeight: 'bold', color: '#333'
                     }}>{userProfile.winterId}</h4>
                     <p
                        style={{
                           fontSize: '16px', fontWeight: '500', color: '#333'
                        }}>{userProfile.name}</p>
                     {
                        slug === auth.user._id ?
                           <button className='btn btn-outline border d-flex align-items-center px-3'
                              onClick={() => setIsEdit(true)}
                           >
                              <BorderColorOutlinedIcon />
                              <span className='ml-2'>
                                 Edit proifle
                              </span>
                           </button>
                           :
                           <FollowBtn user={userProfile} />
                     }
                  </div>
               </div>
               <div className="profile_user_sub_info mt-3">
                  <div className='d-flex align-items-center' style={{ gap: '20px' }}>
                     <div style={{ fontSize: '16px' }} >
                        <strong className='mr-1'>{userProfile.following.length}</strong>
                        <span>Following</span>
                     </div>
                     <div style={{ fontSize: '16px' }} >
                        <strong className='mr-1'>{userProfile.followers.length}</strong>
                        <span>Followers</span>
                     </div>
                     <div style={{ fontSize: '16px' }} >
                        <strong className='mr-1'>{userProfile.liked.length}</strong>
                        <span>Liked</span>
                     </div>
                  </div>
               </div>
               <p className="profile_user_story mt-2 mb-3">
                  {
                     userProfile.story.length > 0 ? userProfile.story : 'No story'
                  }
               </p>
               <div className="profile_user_list_post w-100">
                  <div className='profile_user_list_post-nav w-100 position-relative'
                     style={{ display: "flex", justifyContent: "start" }}
                  >
                     {
                        NavProfileLink.map((item, index) => (
                           <div className='py-2 profile_nav_item' key={index} style={{
                              width: '200px',
                              textAlign: 'center',
                              cursor: 'pointer',
                              borderBottom: '1px solid #ccc',
                              fontWeight: 'bold',
                              color: item === active ? '#333' : '#999',
                              transition: 'all .3s ease-in-out'
                           }}
                              onClick={() => setActive(item)}
                           >
                              {item}
                           </div>
                        ))
                     }
                     <div className={`position-absolute profile_nav_border ${active}`} style={{
                        background: '#000',
                        width: '200px',
                        height: '2px',
                        left: 0,
                        bottom: 0,
                        transform: active === 'Liked' ? 'translateX(200px)' : 'translateX(0px)',
                        transition: 'transform 0.2s ease',
                     }}>

                     </div>
                  </div>
               </div>
            </div>
            {
               active === 'Video' ?
                  userProfile.videos && userProfile.videos.length > 0 &&
                  <PostThumb posts={userProfile.videos} />
                  :
                  userProfile.liked && userProfile.liked.length > 0 &&
                  <PostThumb posts={userProfile.liked} />
            }
         </div>
         {
            isEdit && <EditProfile setIsEdit={setIsEdit} user={userProfile} />
         }
      </div>
   )
}

export default ProfileUser