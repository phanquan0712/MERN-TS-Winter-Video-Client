import React, { useEffect, useRef, useState } from 'react'
import LeftSide from '../components/home/leftSide'
import RightSide from '../components/home/rightSide'
import { useSelector, useDispatch } from 'react-redux'
import { RootStore } from '../utils/Typescript'
import PostThumb from '../components/profile/PostThumb'
import DivLoading from '../components/card/DivLoading'
import { getPostFollowing } from '../redux/actions/postActions'
import SwiperSlide from '../components/card/SwiperSlide'
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useParams, useNavigate } from 'react-router-dom'
import { IParams } from '../utils/Typescript'
import NavSideBar from '../components/global/NavSideBar'
import ListPost from '../components/home/ListPost'
import ListCommentMb from '../components/post/ListCommentMb'
import ShareModal from '../components/global/ShareModal'
import { LIST_POST_NAME } from '../redux/types/postType'

const Home = () => {
   const { followingPost, auth, homePost, mdCm, detailPost, mdSr } = useSelector((state: RootStore) => state)
   const dispatch = useDispatch<any>()
   const [pageNb, setPageNb] = useState<number>(1)
   const [load, setLoad] = useState<boolean>(false)
   const [onDisplay, setOnDisplay] = useState<boolean>(false)
   const pageEnd = useRef<HTMLButtonElement>(null)
   const { page }: IParams = useParams()

   useEffect(() => {
      if (page) {
         dispatch({ type: LIST_POST_NAME, payload: { listPostName: page, listPostSubName: '', idUser: '' } })
      }
   }, [page, dispatch])


   useEffect(() => {
      const observer = new IntersectionObserver(entries => {
         if (entries[0].isIntersecting) {
            if (homePost.total > 0) {
               setPageNb(prev => prev + 1)
               setLoad(load => !load)
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
      if (pageNb > 1 && followingPost.total > 0) {
         setLoad(load => !load)
         dispatch(getPostFollowing(auth.access_token, pageNb))
      }
   }, [pageNb, dispatch, auth.access_token])


   const isActive = (p: string) => {
      console.log(p, page)
      if (p === page) return 'active'
      return ''
   }
   return (
      <>
         {
            window.innerWidth > 768 ?
               <>
                  <div className='home d-flex justify-content-between mx-auto' style={{ marginTop: '70px' }}>
                     <div className='interface_responsive'>
                        <LeftSide />
                     </div>
                     {
                        (auth.access_token && auth.user) ?
                           <RightSide posts={followingPost.posts} total={followingPost.total} />
                           :
                           <PostThumb posts={homePost.posts} />
                     }
                  </div>
                  {
                     load && <DivLoading />
                  }
                  <button className='mb-1' ref={pageEnd} style={{ opacity: 0 }}>Load more</button>
               </>
               :
               <>
                  <ListPost setOnDisplay={setOnDisplay} ListPost={followingPost.posts} />
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