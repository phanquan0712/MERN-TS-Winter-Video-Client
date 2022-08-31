import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootStore, IPost, IPostThumb, IParams } from '../../utils/Typescript'
import FavoriteIcon from '@mui/icons-material/Favorite';
import CardVideo from '../card/CardVideo'
import { useNavigate, useParams } from 'react-router-dom'


interface IProps {
   posts: IPostThumb[]
}

const PostThumb = ({ posts } : IProps) => {
   const { slug, page }: IParams = useParams()
   const navigate = useNavigate()

   return (
      <div className='post_thumb'>
         {
            posts.map(post => (
               <div key={post._id} className="post_thumb_display"
               >
                  <CardVideo src={post.video} id={post._id} />

                  <div className="post_thumb_like">
                     <FavoriteIcon />
                     <span className='ml-1'>{post.likes?.length}</span>
                  </div>
               </div>
            ))
         }
      </div>
   )
}

export default PostThumb