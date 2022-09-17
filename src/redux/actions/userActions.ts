import { GET_DISCOVER_USER } from './../types/profileUser';
import { GET_SUGGESTION_USER, ISuggestionUserType } from './../types/suggestionUser';
import { getApi } from './../../utils/FetchData';
import { Dispatch } from "react";
import { IAuth, AUTH, IAuthType } from "../types/authType";
import { ALERT, IAlertType } from "../types/alertType";
import { IUpdateProfile, IUser } from "../../utils/Typescript";
import { checkImage, imageUpload } from "../../utils/imageUpload";
import { patchApi } from "../../utils/FetchData";
import { GET_PROFILE_USER, IProfileType, FOLLOW, UNFOLLOW, SEARCH_USER } from '../types/profileUser';
import { Socket } from "socket.io-client";
import { createNotify } from './notifyAction';
import { LOAD_SEARCH } from '../types/profileUser';


export const updateUser = (data: IUpdateProfile, auth: IAuth) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
   if (!auth.user || !auth.access_token) return dispatch({ type: ALERT, payload: { error: 'Invalid Authentication!' } });
   if (!data.name.length) return dispatch({ type: ALERT, payload: { error: 'Please, Add your full name' } })
   if (data.name.length > 25) return dispatch({ type: ALERT, payload: { error: 'Your full name is too long' } })
   if (data.story.length > 80) return dispatch({ type: ALERT, payload: { error: 'Your story is too long' } })
   if (data.winterId.length > 25) return dispatch({ type: ALERT, payload: { error: 'Your winterId is too long' } })
   let url = ''
   try {
      dispatch({ type: ALERT, payload: { loading: true } })
      if (data.avatar) {
         const check = checkImage(data.avatar as File);
         if (check) return dispatch({ type: ALERT, payload: { error: check } })
         const photo = await imageUpload(data.avatar as File);
         url = photo.url;
      }

      const newUser: IUser = {
         ...auth.user,
         avatar: url ? url : auth.user?.avatar,
         name: data.name ? data.name : auth.user?.name,
         story: data.story ? data.story : auth.user?.story,
         winterId: data.winterId ? data.winterId : auth.user?.winterId,
      }

      if (JSON.stringify(auth.user) === JSON.stringify(newUser)) {
         return dispatch({ type: ALERT, payload: { error: 'Data is not change' } })
      }
      const res = await patchApi('user', {
         avatar: url ? url : auth.user?.avatar,
         name: data.name ? data.name : auth.user?.name,
         story: data.story ? data.story : auth.user?.story,
         winterId: data.winterId ? data.winterId : auth.user?.winterId,
      }, auth.access_token);
      
      dispatch({
         type: AUTH,
         payload: {
            access_token: auth.access_token,
            user: newUser
         }
      })
      dispatch({ type: ALERT, payload: { success: res.data.msg } })
      window.location.href = `/profile/${newUser._id}`
   } catch (err: any) {
      return dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
   }
}


export const getSuggestionUser = (token?: string) => async (dispatch: Dispatch<ISuggestionUserType | IAlertType>) => {
   try {
      const res = await getApi('suggestion_user', token);
      dispatch({ type: GET_SUGGESTION_USER, payload: res.data.users })
   } catch (err: any) {
      return dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
   }
}

export const getSuggestionUserWhenNoLogin = () => async (dispatch: Dispatch<ISuggestionUserType | IAlertType>) => {
   try {
      const res = await getApi('suggestion_user_no_login');
      dispatch({ type: GET_SUGGESTION_USER, payload: res.data.users })
   } catch (err: any) {
      return dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
   }
}

export const getProfileUser = (id: String) => async (dispatch: Dispatch<IProfileType | IAlertType>) => {
   try {
      dispatch({ type: ALERT, payload: { loading: true } })
      const res = await getApi(`profile_user/${id}`);
      dispatch({ type: GET_PROFILE_USER, payload: res.data.user })
      dispatch({ type: ALERT, payload: { loading: false } })
   } catch (err: any) {
      return dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
   }
}


export const follow = (user: IUser, auth: IAuth, socket: Socket) => async (dispatch: Dispatch<IAuthType | IAlertType | IProfileType>) => {
   let newUser = { ...user, followers: [...user.followers, auth.user] }
   dispatch({ type: FOLLOW, payload: newUser })
   dispatch({
      type: AUTH,
      payload: {
         access_token: auth.access_token,
         user: {
            ...auth.user,
            following: [...auth.user.following, (newUser as IUser)]
         }
      }
   })

   const msg = {
      id: auth.user?._id as string,
      text: 'follow you',
      recipients: [user],
      url: `/profile/${auth.user?._id}`,
      //   content: post.note,
      //   image: post.cover_img,
      typeNotify: 'follow',
   }
   dispatch((createNotify(msg, auth, socket) as any))
   try {
      await patchApi(`user/${user._id}/follow`, {}, auth.access_token);
   } catch (err: any) {
      return dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
   }
}

export const unfollow = (user: IUser, auth: IAuth, socketL: Socket) => async (dispatch: Dispatch<IAuthType | IAlertType | IProfileType>) => {
   let newUser = { ...user, followers: user.followers.filter(f => f._id !== auth.user._id) }
   dispatch({ type: UNFOLLOW, payload: newUser })
   dispatch({
      type: AUTH,
      payload: {
         access_token: auth.access_token,
         user: {
            ...auth.user,
            following: auth.user.following.filter(f => f._id !== user._id)
         }
      }
   })
   try {
      await patchApi(`user/${user._id}/unfollow`, {}, auth.access_token);
   } catch (err: any) {
      return dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
   }
}


export const updateroleChat = (roleChat: string, auth: IAuth) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
   try {
      const newUser: IUser = {
         ...auth.user,
         roleChat: roleChat
      }
      dispatch({
         type: AUTH,
         payload: {
            access_token: auth.access_token,
            user: {
               ...auth.user,
               roleChat,
            }
         }
      })
      console.log(roleChat, auth.user?.roleChat)
      if (auth.user?.roleChat !== roleChat) {
         const res = await patchApi('user', {
            roleChat,
         }, auth.access_token);
         dispatch({ type: ALERT, payload: { success: res.data.msg } })
      }
   } catch (err: any) {
      return dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
   }
}

export const searchUser = (search: string, token?: string) => async (dispatch: Dispatch<IAlertType | IProfileType>) => {
   try {
      dispatch({ type: LOAD_SEARCH, payload: true })
      const res = await getApi(`search_user?name=${search}`, token);
      dispatch({ type: SEARCH_USER, payload: res.data.users })
      dispatch({ type: LOAD_SEARCH, payload: false })
   } catch(err: any) {
      return dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
   }
}

export const getDiscoverUser = (token?: string) => async (dispatch: Dispatch<IAlertType | IProfileType>) => {
   try {
      if(token) {
         const res = await getApi(`discover_user`, token);
         dispatch({ type: GET_DISCOVER_USER, payload: res.data })
      } else {
         const res = await getApi(`discover_user_no_login`);
         dispatch({ type: GET_DISCOVER_USER, payload: res.data })
      }

   } catch(err: any) {
      return dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
   }
}