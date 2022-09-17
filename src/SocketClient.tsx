import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootStore, IMessage, IParams, IUserMess, IUser, IComment } from './utils/Typescript'
import { ADD_MESSAGE, DELETE_CONVERSATION, DELETE_MESSAGE } from './redux/types/messageType'
import { deleteConversation, getConversations } from './redux/actions/messageAction'
import { useParams, useNavigate } from 'react-router-dom'
import { DELETE_ANSWER_COMMENT_POST, DELETE_COMMENT_POST, UPDATE_POST } from './redux/types/postType'
import { CREATE_NOTIFY, DELETE_NOTIFY } from './redux/types/notifyType'


const spawnNotification = (body: any, icon: any, url: any, title: any) => {
   let options = {
      body, icon
   }

   let n = new Notification(title, options)

   n.onclick = (e: any) => {
      e.preventDefault()
      window.open(url, '_blank')
   }
}

const SocketClient = () => {
   const { auth, socket, message, notify } = useSelector((state: RootStore) => state)
   const dispatch = useDispatch<any>()
   const { slug }: IParams = useParams()
   // Join user
   useEffect(() => {
      if(auth.user) {
         socket.emit('joinUser', auth.user)
         return () => socket.off('joinUser')
      }
   }, [auth.user, socket])
   
   // Message
   useEffect(() => {
      socket.on('addMessageToClient', (data: IMessage) => {
         console.log(data)
         dispatch({ type: ADD_MESSAGE, payload: data })
         if(message.conversations.every(item => item._id !== (data.sender as IUser)?._id)) {
            dispatch(getConversations(auth))
         }
      })
      return () => socket.off('addMessageToClient')
   }, [socket, message.conversations, dispatch])

   useEffect(() => {
      socket.on('deletMessageToClient', (data: IMessage) => {
         dispatch({ type: DELETE_MESSAGE, payload: data._id })
         if(message.messages.length === 0) {
            const conversation = message.conversations.find(conversation => conversation._id === (data.sender as IUser)?._id)
            dispatch(deleteConversation(conversation as IUserMess, data.conversation as string, auth.access_token, socket))
         }
      })
      return () => socket.off('deletMessageToClient')
   }, [socket, message.messages, dispatch])

   useEffect(() => {
      socket.on('deleteConversationToClient', (data: IUserMess) => {
         dispatch(deleteConversation(data, data.conversationId as string, auth.access_token, socket))
      })
      return () => socket.off('deleteConversationToClient')
   }, [socket, dispatch])

   // Comment
   useEffect(() => {
      socket.on('deleteCommentToClient', (cm: IComment) => {
         if(cm.comment_root) {
            dispatch({ type: DELETE_ANSWER_COMMENT_POST, payload: cm })
         } else {
            dispatch({ type: DELETE_COMMENT_POST, payload: cm })
         }
      })
      return () => socket.off('deleteCommentToClient')
   }, [socket, dispatch])

   // Post
   useEffect(() => {
      socket.on('updatePostToClient', (data: any) => {
         dispatch({ type: UPDATE_POST, payload: { roleWatcher: data.roleWatcher, isComment: data.isComment} });
      })
      return () => socket.off('updatePostToClient')
   }, [socket, dispatch])
   

   useEffect(() => {
      socket.on('deletePostToClient', (data: any) => {
         window.location.href = '/'
      })
      return () => socket.off('deletePostToClient')
   }, [socket, dispatch])

   // Notification
   useEffect(() => {
      socket.on('createNotifyToClient', (data: any) => {
         dispatch({ type: CREATE_NOTIFY, payload: data })
         spawnNotification(
            data.user.name + ' ' + data.text,
            data.user.avatar,
            data.url,
            'Winter'
         )
      })
      return () => socket.off('createNotifyToClient')
   }, [socket, dispatch])

   useEffect(() => {
      socket.on('deleteNotifyToClient', (data: any) => {
         dispatch({ type: DELETE_NOTIFY, payload: data })
      })
      return () => socket.off('deleteNotifyToClient')
   }, [socket, dispatch])

   return (
      <></>
   )
}

export default SocketClient