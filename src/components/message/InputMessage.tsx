import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FormSubmit, RootStore, IParams, IUser, IMessage } from '../../utils/Typescript'
import { useParams } from 'react-router-dom'
import { addMesasge } from '../../redux/actions/messageAction'



interface IProps {
   user: IUser
}

const InputMessage = ({ user }: IProps) => {
   const { auth, message, socket } = useSelector((state: RootStore) => state)
   const dispatch = useDispatch<any>()
   const [content, setContent] = useState<string>('')
   const { slug, page }: IParams = useParams()
   console.log(slug, page)
   const handleSubmit = (e: FormSubmit) => {
      e.preventDefault()
      if(!content.trim()) return
      if(!user._id || !auth.user._id) return
      const newMessage = {
         sender: auth.user,
         recipient: user,
         text: content,
      }
      dispatch(addMesasge(newMessage, auth, socket))
      setContent('')
   }
   return (
      <form className="input_message" onSubmit={handleSubmit}>
         <input type="text" placeholder='Add message...' value={content} onChange={(e) => setContent(e.target.value) } />
      </form>
   )
}

export default InputMessage