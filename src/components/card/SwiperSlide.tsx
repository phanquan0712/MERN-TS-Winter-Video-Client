// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import CardPostMb from '../card/CardPostMb';
import { Pagination } from "swiper";
import { useState, useEffect,useRef } from 'react';
import DivLoading from '../card/DivLoading';
import { useSelector, useDispatch } from 'react-redux'
import { RootStore, IPost, IParams } from '../../utils/Typescript'
import { getHomePost, getPostFollowing } from '../../redux/actions/postActions'
import { useParams } from 'react-router-dom'
interface IProps {
   posts: IPost[]
   openListPost?: string
   navProifle?: string
}

const Slide = ({ posts, openListPost, navProifle }: IProps) => {
   const [pageNb, setPageNb] = useState<number>(1)
   const { auth, homePost, followingPost } = useSelector((state: RootStore) => state)
   const { page, slug }: IParams = useParams()
   const swiperRef = useRef(null)
   const dispatch = useDispatch<any>()
   const handleChangeSlide = (slides: any) => {
      if(slides.activeIndex === homePost.total - 1) {
         setPageNb(prev => prev + 1)
      }
   }

   useEffect(() => {
      // move slide to index
      if(openListPost && openListPost.length > 0) {
         const index = posts.findIndex(post => post._id === openListPost)
         const swiper = document.querySelector('.swiper') as any
         swiper.swiper.slideTo(index)
      }
   }, [openListPost, ])

   useEffect(() => {
      if (pageNb > 1) {
         if(page === 'foryou' && homePost.total) { 
            dispatch(getHomePost(pageNb))
         } else if(page === 'following' && followingPost.total) {
            dispatch(getPostFollowing(auth.access_token, pageNb))
         }
      }
   }, [page, dispatch, pageNb, homePost.total, followingPost.total, auth.access_token])

   return (
         <Swiper
            spaceBetween={0}
            slidesPerView={1}
            pagination={{ clickable: true }}
            direction={"vertical"}
            modules={[Pagination]}
            className="mySwiper position-relative"
            onSlideChange={(slides) => handleChangeSlide(slides)}
            onSwiper={(swiper) => console.log(swiper)}
         >
            {
               posts.map((post, index) => (
                  <SwiperSlide key={post._id}>
                     <CardPostMb navProifle={navProifle} pageName={page} post={post} />
                  </SwiperSlide>
               ))
            }
         </Swiper>
   );
};

export default Slide;