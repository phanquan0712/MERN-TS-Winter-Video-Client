import { DELETE_CONVERSATION, DELETE_MESSAGE } from './../types/messageType';
import { deleteApi, getApi, postAPi } from './../../utils/FetchData';
import { IAuthType } from './../types/authType';
import { IMessage, IUserMess } from './../../utils/Typescript';
import { ADD_CONVERSATION, ADD_MESSAGE, GET_CONVERSATIONS, GET_MESSAGES, IMessageType } from '../types/messageType'
import { Dispatch } from 'react'
import { ALERT, IAlertType } from "../types/alertType"
import { IAuth } from '../types/authType'
import {  IUser } from '../../utils/Typescript'
import { Socket } from 'socket.io-client';
import { createNotify } from './notifyAction';

export const addConversation = (userRicipient: IUser, auth: IAuth)=> async (dispatch: Dispatch<IAlertType | IMessageType>) => {
   const newConversation = {
      ...userRicipient,
      recipients: [auth.user, userRicipient],
      nick_name: `${auth.user?.name}, ${userRicipient.name}`
   }
   dispatch({ type: ADD_CONVERSATION, payload: newConversation })
}


export const addMesasge = (data: IMessage, auth: IAuth, socket: Socket) => async (dispatch: Dispatch<IAlertType | IMessageType>) => {
   socket.emit('addMessage', data)
   try {
      const res = await postAPi('message', data, auth.access_token)
      dispatch({ type: ADD_MESSAGE, payload: res.data.message })

      const msg = {
         id: auth.user?._id as string,
         text: 'You have a new message',
         recipients: [data.recipient as IUser],
         url: `/message/${auth.user?._id}`,
         //   content: post.note,
         // image: post.cover_img,
         typeNotify: 'message',
      }
      dispatch((createNotify(msg, auth, socket) as any))
   } catch(err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg } })
   }
}

// Get conversation 
export const getConversations = (auth: IAuth) => async (dispatch: Dispatch<IAlertType | IMessageType>) => {
   try {
      // dispatch({type: ALERT, payload: {loading: true}})
      const res = await getApi('conversations', auth.access_token)
      let newArr: IUserMess[] = [];
      (res.data.conversations as IUserMess[]).forEach(item => {
         (item.recipients as IUser[]).forEach(cv => {
            if (cv._id !== auth.user?._id) {
               (newArr as IUserMess[]).push({ ...cv, text: item.text, conversationId: item._id , _id2: auth.user?._id});
            }
         })
      })
      console.log(res.data.conversations)
      dispatch({type: GET_CONVERSATIONS, payload: { conversations: newArr, totalConversations: res.data.total }})
      // dispatch({type: ALERT, payload: {loading: false}})
   } catch(err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg } })
   }
} 

// Get messages
export const getMessage = (conversationId: string, token: string, page: number = 1) => async (dispatch: Dispatch<IAlertType | IMessageType>) => {
   try {
      const res = await getApi(`messages/${conversationId}?limit=${page * 15}`, token)
      dispatch({ type: GET_MESSAGES, payload: { messages: res.data.messages, totalMessage: res.data.total}})
   } catch(err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg } })
   }
}


export const deleteConversation = (conversation: IUserMess, conversationId: string, token: string, socket: Socket) => async (dispatch: Dispatch<IAlertType | IMessageType>) => {
   dispatch({ type: DELETE_CONVERSATION, payload: conversation._id as string })
   socket.emit('deleteConversation', conversation)
   try {
      await deleteApi(`delete_conversation/${conversationId}`, token)
      // window.location.href = '/message'
   } catch(err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg } })
   }
}

export const deleteMessage = (message: IMessage, token: string, socket: Socket) => async (dispatch: Dispatch<IAlertType | IMessageType>) => {
   dispatch({ type: DELETE_MESSAGE, payload: message._id as string })
   socket.emit('deleteMessage', message)
   try {
      await deleteApi(`delete_message/${message._id}`, token)
   } catch(err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg } })
   }
}