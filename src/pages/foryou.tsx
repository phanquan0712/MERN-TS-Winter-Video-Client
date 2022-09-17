import React, { useState, useRef, useEffect } from 'react'
import LeftSide from '../components/home/leftSide'
import RightSide from '../components/home/rightSide'
import { useSelector, useDispatch } from 'react-redux'
import { RootStore, IPost } from '../utils/Typescript'
import { getHomePost } from '../redux/actions/postActions'
import DivLoading from '../components/card/DivLoading'
import CardPost from '../components/card/CardPost'
import CardPostMb from '../components/card/CardPostMb'
import SwiperSlide from '../components/card/SwiperSlide'
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useParams } from 'react-router-dom'
import { IParams } from '../utils/Typescript'
import { Avatar } from '@mui/material'
import NavSideBar from '../components/global/NavSideBar'
import FooterContainer from '../components/home/FooterContainer'
import ListPost from '../components/home/ListPost'
import ListCommentMb from '../components/post/ListCommentMb'
import NotFound from '../components/global/NotFound'
import ShareModal from '../components/global/ShareModal'


const Home = () => {
   const { homePost, detailPost, mdCm, mdSr } = useSelector((state: RootStore) => state)
   const dispatch = useDispatch<any>()
   const [pageNb, setPageNb] = useState<number>(1)
   const [load, setLoad] = useState<boolean>(false)
   const [onDisplay, setOnDisplay] = useState<boolean>(false)
   const pageEnd = useRef<HTMLButtonElement>(null)
   const { page }: IParams = useParams()
   useEffect(() => {
      const observer = new IntersectionObserver(entries => {
         if (entries[0].isIntersecting) {
            if (homePost.total > 0) {
               setLoad(true)
               setPageNb(prev => prev + 1)
            }
         }
      }, {
         threshold: 0.1
      })
      if (pageEnd.current) {
         observer.observe(pageEnd.current)
      }
   }, [setPageNb, pageEnd.current, homePost.total])

   useEffect(() => {
      if (pageNb > 1 && homePost.total > 0) {
         dispatch(getHomePost(pageNb))
         setLoad(false)
      }
   }, [pageNb, dispatch])

   useEffect(() => {
      return () => setOnDisplay(false)
   }, [])



   return (
      <>
         {
            window.innerWidth > 768 ?
               <div className='home d-flex justify-content-between mx-auto' style={{ marginTop: '70px' }}>
                  {
                     window.innerWidth > 768 &&
                     <div className='interface_responsive'>
                        <LeftSide />
                     </div>
                  }
                  <RightSide posts={homePost.posts} total={homePost.total} load={load} />
                  {
                     load && <DivLoading />
                  }
               </div>
               :
                  <>
                     <ListPost setOnDisplay={setOnDisplay} ListPost={homePost.posts} />
                     {
                        onDisplay && <NavSideBar setOnDisplay={setOnDisplay} onDisplay={onDisplay} />
                     }
                     {
                        mdCm && <ListCommentMb post={detailPost} />
                     }
                     {
                        mdSr && <ShareModal url={`${window.location.origin}/post/${detailPost._id}`} />
                     }
                  </>
         }
      </>
   )
}

export default Home