import React from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { IPost, RootStore } from '../../utils/Typescript'
import CardPost from '../card/CardPost'

interface IProps {
   posts: IPost[]
   total: number
}

const RightSide = ({ posts, total }: IProps) =>  {
   const { auth } = useSelector((state: RootStore) => state)
   return (
      <div className='list_post'>
         {
            posts && posts.length > 0 && 
            posts.map((post: IPost) => (
               <CardPost key={post._id} post={post} />
            ))
         }
      </div>
   )
}

export default RightSide