import console from 'console'
import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createAnswerComment, createComment } from '../../redux/actions/commentActions'
import { AUTH_MODAL } from '../../redux/types/authType'
import { ANSWER_COMMENT } from '../../redux/types/commentType'
import { RootStore, IComment, IPost, FormSubmit } from '../../utils/Typescript'
import AuthModal from '../auth/AuthModal'


interface IProps {
   post: IPost
}
const InputComment = ({ post }: IProps) => {
   const [content, setContent] = useState<string>('')
   const { auth, tagComment, detailPost } = useSelector((state: RootStore) => state)
   const dispatch = useDispatch<any>()
   const inputRef = useRef<HTMLInputElement>(null)
   useEffect(() => {
      if (tagComment.user?.winterId) {
         inputRef.current?.focus()
         setContent(`@${tagComment.user?.winterId}: `)
      }
   }, [tagComment])

   useEffect(() => {
      const keyDownEvent = (event: any) => {
         const { key } = event
         if (key === 'Backspace') {
            if (content === `@${tagComment.user?.winterId}: `) {
               setContent('')
               return dispatch({ type: ANSWER_COMMENT, payload: {} })
            }
         }
      }
      if (inputRef.current) {
         inputRef.current.addEventListener('keydown', keyDownEvent)
         return () => {
            if (inputRef.current)
               inputRef.current.removeEventListener('keydown', keyDownEvent)
         }
      }
   }, [tagComment, inputRef])

   const handleSubmit = (e: FormSubmit) => {
      e.preventDefault()
      if (tagComment.user && tagComment.content) {
         if (tagComment.comment_root) {
            const newComment = {
               user: auth.user,
               postId: post,
               postUserId: post.user,
               tag: tagComment.user,
               comment_root: tagComment.comment_root,
               content,
               reply: [],
               likes: [],
               createdAt: new Date().toISOString()
            }
            dispatch(createAnswerComment(newComment, tagComment, auth))
         } else {
            const newComment = {
               user: auth.user,
               postId: post,
               postUserId: post.user,
               tag: tagComment.user,
               comment_root: tagComment,
               content,
               reply: [],
               likes: [],
               createdAt: new Date().toISOString()
            }
            dispatch(createAnswerComment(newComment, tagComment, auth))
         }
      } else {
         const newComment = {
            user: auth.user,
            postId: post,
            postUserId: post.user,
            content,
            reply: [],
            likes: [],
            createdAt: new Date().toISOString()
         }
         dispatch(createComment(newComment, auth))
      }
      dispatch({ type: ANSWER_COMMENT, payload: {} })
      setContent('')
   }
   return (
      <>
         {
            detailPost.isComment ? 
               <form className="input_comment" onSubmit={handleSubmit}>
                  {
                     (auth.user && auth.access_token) ?
                        <>
                           <input type="text" placeholder='Add comments...'
                              ref={inputRef}
                              value={content}
                              onChange={(e) => setContent(e.target.value)}
                           />
                           <button type='submit' className='btn btn-dark-outline'>Post</button>
                        </>
                        :
                        <div className='w-100' style={{ padding: '16px 20px', cursor: 'pointer', background: '#eee' }}
                           onClick={() => dispatch({ type: AUTH_MODAL, payload: true })}
                        >
                           <h4 style={{ color: 'red', fontSize: '16px', marginBottom: '0' }}>Please log in to comment</h4>
                        </div>
                  }
               </form>
               :
               <></>
         }
      </>
   )
}

export default InputComment