import React from 'react'
import { IPost, RootStore } from '../../utils/Typescript'
import CardComment from '../card/CardComment'
import { useSelector } from 'react-redux'


interface IProps {
   post: IPost
}

const ListComment = ({ post }: IProps) => {
   const { auth, detailPost } = useSelector((state: RootStore) => state)
   return (
      <>
      {
         detailPost.isComment ? 
      <div className="list_comment mt-3 h-100">
         {
            post.comments &&
            post.comments.map((comment) => (
               <CardComment comment={comment} />
            ))
         }
         {
            post.comments?.length === 0 && 
            <div className='d-flex justify-content-center align-items-center'>
               <h5>No comment</h5>
            </div>
         }
      </div>
      :
      <div className="list_comment mt-3 h-100">
         <p className='text-center mt-3'
            style={{
               fontSize: '16px', color:'#333', fontWeight: '500'
            }}
         >Comments have been turner off</p>
      </div>
      }
      </>
   )
}

export default ListComment