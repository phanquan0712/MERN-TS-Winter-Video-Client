import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootStore, IPost, IPostThumb, IParams } from '../../utils/Typescript'
import FavoriteIcon from '@mui/icons-material/Favorite';
import CardVideo from '../card/CardVideo'
import { useNavigate, useParams } from 'react-router-dom'


interface IProps {
   posts: IPostThumb[] | IPost[]
   openListPost?: string
   setOpenListPost?: (openListPost: string) => void
}

const PostThumb = ({ posts, openListPost, setOpenListPost } : IProps) => {
   const { auth } = useSelector((state: RootStore) => state)
   const { slug, page }: IParams = useParams()
   const navigate = useNavigate()
   
   const handleOpenListPost = (id: string) => {
      if (setOpenListPost) {
         setOpenListPost(id)
      } else {
         navigate(`/post/${id}`)
      }
   }

   return (
      <div className='post_thumb' style={{ overflowY: 'auto' }}>
         {
            posts.map(post => (
               <div key={post._id} className="post_thumb_display"
               >
                  {
                     window.innerWidth < 768 ?
                     post.cover_img ? 
                     <div className='w-100 h-100' onClick={() => handleOpenListPost(post._id)}>
                     {/* <div className='w-100 h-100' onClick={() => navigate(`/post/${post._id}`)}> */}
                        <img src={post.cover_img} alt="" />
                     </div>
                     :
                     <div className='w-100 h-100' onClick={() => handleOpenListPost(post._id)}>
                        <CardVideo post={post} id={post._id} page={page as string} />
                     </div>
                     :
                     <CardVideo post={post} id={post._id} page={page as string} />
                  }
                  {
                     auth.user && auth.access_token && 
                     <div className="post_thumb_like">
                        <FavoriteIcon />
                        <span className='ml-1'>{(post as IPostThumb).likes?.length}</span>
                     </div>
                  }
               </div>
            ))
         }
      </div>
   )
}

export default PostThumb