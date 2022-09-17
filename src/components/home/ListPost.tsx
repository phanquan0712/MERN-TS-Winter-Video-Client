import React, { useState, useRef, useEffect } from 'react'
import LeftSide from '../../components/home/leftSide'
import RightSide from '../../components/home/rightSide'
import { useSelector, useDispatch } from 'react-redux'
import { RootStore, IPost } from '../../utils/Typescript'
import { getHomePost } from '../../redux/actions/postActions'
import DivLoading from '../../components/card/DivLoading'
import CardPost from '../../components/card/CardPost'
import CardPostMb from '../../components/card/CardPostMb'
import SwiperSlide from '../../components/card/SwiperSlide'
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useParams, useNavigate } from 'react-router-dom'
import { IParams } from '../../utils/Typescript'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { auth } from 'google-auth-library'
import { AUTH_MODAL } from '../../redux/types/authType'


interface IProps {
   ListPost: IPost[]
   openListOpen?: string
   setOpenListPost?: (id: string) => void
   setOnDisplay?: (value: boolean) => void
   navProifle?: string
}

const ListPost = ({ ListPost, openListOpen, setOpenListPost, setOnDisplay, navProifle  }: IProps) => {
   const { page }: IParams = useParams()
   const { auth } = useSelector((state: RootStore) => state)
   const dispatch  = useDispatch<any>()
   const isActive = (p: string) => {
      if (p === page) return 'active'
      return ''
   }

   const handleCloseModalListPost = () => {
      if (setOpenListPost) setOpenListPost('')
   }

   const handleOpenSideBar = () => {
      if (setOnDisplay) setOnDisplay(true)
   }
   return (
      <div className='home_list_post upload_preview position-absolute'>
         {
            !auth.user && page === 'following' ? 
            <div className='fl_no_login'>
               <h6 className='mb-0'>Log in to see videos from creators you follow</h6>
               <button className='btn fl_no_login-btn' onClick={() => dispatch({ type: AUTH_MODAL, payload: true})}>Log in</button>
            </div>
            :
            <SwiperSlide navProifle={navProifle} posts={ListPost} openListPost={openListOpen} />
         }
         {
            openListOpen && openListOpen.length > 0 ?
               <div className='loopback' style={{ zIndex: 1000 }} onClick={handleCloseModalListPost}>
                  <ArrowBackIosIcon />
               </div>
               :
               <div className='header_container'>
                  <div onClick={handleOpenSideBar}>
                     <MenuIcon />
                  </div>
                  <nav className='nav_tab'>
                     <Link to={`/following`} className={`${isActive('following')}`}>
                        Following
                     </Link>
                     <Link to={`/foryou`} className={`${isActive('foryou')}`}>
                        For you
                     </Link>
                  </nav>
               </div>
         }
      </div>
   )
}

export default ListPost