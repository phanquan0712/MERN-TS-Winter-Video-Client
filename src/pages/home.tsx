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
import { Link, useParams, useNavigate } from 'react-router-dom'
import { IParams } from '../utils/Typescript'
import ListPost from '../components/home/ListPost'
import { LIST_POST_NAME } from '../redux/types/postType'


const Home = () => {
   const { homePost } = useSelector((state: RootStore) => state)
   const dispatch = useDispatch<any>()
   const navigate = useNavigate()
   const [pageNb, setPageNb] = useState<number>(1)
   const [load, setLoad] = useState<boolean>(false)
   const pageEnd = useRef<HTMLButtonElement>(null)
   const { page }: IParams = useParams()


   useEffect(() => {
      if(page) {
         dispatch({ type: LIST_POST_NAME, payload: { listPostName: page, listPostSubName: '', idUser: '' } })
      }   
   }, [page, dispatch])

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
      if(window.innerWidth < 768) {
         navigate('/foryou')
      }
   }, [window.innerWidth])

   const isActive = (p: string) => {
      if (p === page) return 'active'
      return ''
   }
   return (
      <>
         {
            window.innerWidth > 768 ?
               <>
                  <div className='home d-flex justify-content-between mx-auto' style={{ marginTop: '70px' }}>
                     {
                        window.innerWidth > 768 &&
                        <div className='interface_responsive'>
                           <LeftSide />
                        </div>
                     }
                     <RightSide posts={homePost.posts} total={homePost.total} load={load} />
                  </div>
                  {
                     load && <DivLoading />
                  }
                  <button className='mb-1' ref={pageEnd} style={{ opacity: 0 }}>Load more</button>
               </>
               :
               <ListPost ListPost={homePost.posts} />
         }
      </>
   )
}

export default Home