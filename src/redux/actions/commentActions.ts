import { postAPi, patchApi, deleteApi } from './../../utils/FetchData';
import { CREATE_COMMENT_POST, CREATE_ANSWER_COMMENT_POST, LIKE_COMMENT, LIKE_ANSWER_COMMENT, DELETE_COMMENT_POST, DELETE_ANSWER_COMMENT_POST } from './../types/postType';
import { IAuth } from './../types/authType';
import { Dispatch } from 'react'
import { ALERT, IAlertType } from "../types/alertType";
import { IComment, IUser } from '../../utils/Typescript';
import { IPostType } from '../types/postType';
import { Socket } from 'socket.io-client';
import { createNotify  } from './notifyAction';


export const createComment = (data: IComment, auth: IAuth, socket: Socket) => async (dispatch: Dispatch<IAlertType | IPostType>) => {
   try {
      const res = await postAPi('/comment', data, auth.access_token)
      dispatch({ type: CREATE_COMMENT_POST, payload: res.data.newComment })
      if (data.user?._id !== auth.user?._id || auth.user?._id !== data.postUserId?._id)  {
         const newRecipient = data.tag ? [data.postUserId, data.tag] : [data.postUserId]
         const msg = {
            id: auth.user?._id as string,
            text: 'comment your post',
            recipients: newRecipient as IUser[],
            url: `/post/${data.postId?._id}`,
            content: data.content,
            image: data.postId?.cover_img as string,
            typeNotify: 'comment',
         }
         dispatch((createNotify(msg, auth, socket) as any))
      }
   } catch (err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
   }
}


export const createAnswerComment = (answerComment: IComment, tagComment: IComment, auth: IAuth, socket: Socket) => async (dispatch: Dispatch<IAlertType | IPostType>) => {
   try {
      const comment = {
         ...answerComment,
         postId: answerComment.postId._id,
         tag: (answerComment.tag as IUser)?._id,
         comment_root: typeof (answerComment.comment_root) === 'string' ? answerComment.comment_root : (answerComment.comment_root as IComment)._id
      }
      const res = await postAPi(`answer_comment/${comment.comment_root}`, comment, auth.access_token)
      dispatch({ type: CREATE_ANSWER_COMMENT_POST, payload: res.data.newComment })


      if (answerComment.user?._id !== auth.user?._id || auth.user?._id !== tagComment.postUserId?._id || auth.user?._id !== answerComment.user?._id)   {
         const newRecipient = answerComment.tag ? [answerComment.postUserId, answerComment.tag] : [answerComment.postUserId]
         const msg = {
            id: auth.user?._id as string,
            text: 'comment your post',
            recipients: newRecipient as IUser[],
            url: `/post/${answerComment.postId?._id}`,
            content: answerComment.content,
            image: answerComment.postId?.cover_img as string,
            typeNotify: 'comment',
         }
         dispatch((createNotify(msg, auth, socket) as any))
      }
   } catch (err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
   }
}

export const likeComment = (data: IComment, auth: IAuth) => async (dispatch: Dispatch<IAlertType | IPostType>) => {
   const newComment = { ...data, likes: [...data.likes, auth.user._id] }
   if (newComment.comment_root) {
      dispatch({ type: LIKE_ANSWER_COMMENT, payload: newComment as IComment })
   } else {
      dispatch({ type: LIKE_COMMENT, payload: newComment as IComment })
   }
   try {
      await patchApi(`comment/${data._id}/like`, {}, auth.access_token)
   } catch (err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
   }
}


export const unLikeComment = (data: IComment, auth: IAuth) => async (dispatch: Dispatch<IAlertType | IPostType>) => {
   const newComment = { ...data, likes: data.likes.filter(item => item !== auth.user._id) }
   if (newComment.comment_root) {
      dispatch({ type: LIKE_ANSWER_COMMENT, payload: newComment as IComment })
   } else {
      dispatch({ type: LIKE_COMMENT, payload: newComment as IComment })
   }
   try {
      await patchApi(`comment/${data._id}/unlike`, {}, auth.access_token)
   } catch (err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
   }
}

export const deleteComment = (data: IComment, auth: IAuth, socket: Socket) => async (dispatch: Dispatch<IAlertType | IPostType>) => {
   dispatch({ type: DELETE_COMMENT_POST, payload: data })
   socket.emit('deleteComment', data)
   try {
      await deleteApi(`delete_comment/${data._id}`, auth.access_token)
   } catch (err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
   }
}

export const deleteAnswerComment = (data: IComment, auth: IAuth, socket: Socket) => async (dispatch: Dispatch<IAlertType | IPostType>) => {
   dispatch({ type: DELETE_ANSWER_COMMENT_POST, payload: data })
   socket.emit('deleteComment', data)
   try {
      await deleteApi(`delete_comment/${data._id}`, auth.access_token)
   } catch (err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
   }
}