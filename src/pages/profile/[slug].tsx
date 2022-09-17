import React, { useEffect, useState } from 'react'
import LeftSide from '../../components/home/leftSide'
import { useSelector, useDispatch } from 'react-redux'
import { RootStore, IPost, IPostThumb } from '../../utils/Typescript'
import Avatar from '../../components/global/Avatar'
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import EditProfile from '../../components/profile/EditProfile'
import { useParams, useNavigate } from 'react-router-dom'
import { IParams, IUser } from '../../utils/Typescript'
import { getProfileUser } from '../../redux/actions/userActions'
import PostThumb from '../../components/profile/PostThumb'
import ListPost from '../../components/home/ListPost'
import Loading from '../../components/alert/Loading'
import ListCommentMb from '../../components/post/ListCommentMb'
import NotLogin from '../../components/global/NotLogin'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FollowBtn from '../../components/global/FollowBtn'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ShareModal from '../../components/global/ShareModal'
import { LIST_POST_NAME } from '../../redux/types/postType'

const ProfileUser = () => {
   const { slug, page }: IParams = useParams()
   const dispatch = useDispatch<any>()
   const navigate = useNavigate()
   const { auth, profileUser, mdCm, detailPost, mdSr } = useSelector((state: RootStore) => state)
   const NavProfileLink = ['Video', 'Liked']
   const [active, setActive] = useState<string>(NavProfileLink[0])
   const [isEdit, setIsEdit] = useState<boolean>(false)
   const [openListPost, setOpenListPost] = useState<string>('')
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

   useEffect(() => {
      if(page) {
         dispatch({ type: LIST_POST_NAME, payload: { listPostName: page, listPostSubName: active, idUser: slug}})
      }   
   }, [page, dispatch, active, slug])


   if (!userProfile) return <NotLogin title='Profile' img='profile' description='Register accounts' />
   return (
      <div className='profile_user d-flex justify-content-between'
         style={{ marginLeft: 0, marginRight: 0 }}
      >
         <div className='interface_responsive'>
            <LeftSide toggle={true} />
         </div>
         <div className="user_page">
            <div className="right_side-profile">
               {
                  window.innerWidth < 768 &&
                  <div className="header_profile">
                     <p className='mb-0'>{userProfile.name}</p>
                     {
                        slug === auth.user?._id && 
                     <div className="header_profile_options" onClick={() => navigate('/setting')}>
                        <MoreHorizIcon />
                     </div>
                     }
                     {
                        slug !== auth.user?._id &&
                        <div className='arrow_prev_page' onClick={() => navigate('/foryou')}>
                              <ArrowBackIosIcon />
                        </div>
                     }
                  </div>
               }
               <div className="profile_user_info d-flex align-items-center">
                  {
                     window.innerWidth < 768 &&
                     <Avatar src={userProfile.avatar} size='superMd' />
                  }
                  <div className='card_text'>
                     <Avatar src={userProfile.avatar} size='super' />
                  </div>
                  <div className='ml-2 text_margin'>
                     <h4 className='winterId' style={{
                        fontSize: '24px', fontWeight: 'bold', color: '#333'
                     }}>{userProfile.winterId}</h4>
                     <p
                        className='card_text'
                        style={{
                           fontSize: '16px', fontWeight: '500', color: '#333'
                        }}>{userProfile.name}</p>
                     <div className='card_text '>
                        {
                           slug === auth.user?._id ?
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
               </div>
               <div className="profile_user_sub_info mt-3 text-center">
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
               {
                  window.innerWidth < 768 &&
                  slug !== auth.user?._id && 
                  <div className='my-2 d-flex justify-content-center'>
                     <FollowBtn user={userProfile} />
                  </div>
               }
               <p className={`profile_user_story mt-2 mb-3 no-story`}>
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
                  <PostThumb setOpenListPost={setOpenListPost} posts={userProfile.videos} />
                  :
                  userProfile.liked && userProfile.liked.length > 0 &&
                  <PostThumb setOpenListPost={setOpenListPost} posts={userProfile.liked} />
            }
         </div>
         {
            isEdit && <EditProfile setIsEdit={setIsEdit} user={userProfile} />
         }
         {
            openListPost && <ListPost navProifle={active} openListOpen={openListPost} setOpenListPost={setOpenListPost} ListPost={active === 'Video' ? userProfile.videos as IPost[] : userProfile.liked as IPost[]} />
         }
         {
            mdCm && <ListCommentMb userProfile={userProfile} active={active} post={detailPost} />
         }
         {
            mdSr && <ShareModal url={`${window.location.origin}/post/${detailPost._id}`} />
         }
      </div>
   )
}

export default ProfileUser