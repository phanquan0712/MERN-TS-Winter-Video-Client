import { GET_SUGGESTION_USER, ISuggestionUserType } from './../types/suggestionUser';
import { getApi } from './../../utils/FetchData';
import { Dispatch } from "react";
import { IAuth, AUTH, IAuthType } from "../types/authType";
import { ALERT, IAlertType } from "../types/alertType";
import { IUpdateProfile, IUser } from "../../utils/Typescript";
import { checkImage, imageUpload } from "../../utils/imageUpload";
import { patchApi } from "../../utils/FetchData";
import { GET_PROFILE_USER, IProfileType, FOLLOW, UNFOLLOW } from '../types/profileUser';

export const updateUser = (data: IUpdateProfile ,auth: IAuth) => async(dispatch: Dispatch<IAuthType | IAlertType>) => {
   if(!auth.user || !auth.access_token) return dispatch({ type: ALERT, payload: { error: 'Invalid Authentication!'} });
   if (!data.name.length) return dispatch({ type: ALERT, payload: { error: 'Please, Add your full name' } })
   if (data.name.length > 25) return dispatch({ type: ALERT, payload: { error: 'Your full name is too long' } })
   if (data.story.length > 80) return dispatch({ type: ALERT, payload: { error: 'Your story is too long' } })
   if(data.winterId.length > 25) return dispatch({ type: ALERT, payload: { error: 'Your winterId is too long' } })
   let url  =''
   try {
      if(data.avatar) {
         const check = checkImage(data.avatar as File);
         if(check) return dispatch({ type: ALERT, payload: { error: check } })
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
         return dispatch({ type: ALERT, payload: { error: 'Data is not change'} })
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
            user: {
               ...auth.user,
               ...newUser
            }
         }
      })
      dispatch({ type: ALERT, payload: { success: res.data.msg} })


   } catch(err: any) {
      return   dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
   }
}


export const getSuggestionUser = (token?: string) => async(dispatch: Dispatch<ISuggestionUserType | IAlertType>) => {
   try {
      const res = await getApi('suggestion_user', token);
      dispatch({ type: GET_SUGGESTION_USER, payload: res.data.users })
   } catch(err: any) {
      return dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
   }
}

export const getProfileUser = (id: String) => async(dispatch: Dispatch<IProfileType | IAlertType>) => {
   try {
      const res = await getApi(`profile_user/${id}`);
      dispatch({ type: GET_PROFILE_USER, payload: res.data.user })
   } catch(err: any) {
      return dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
   }
}


export const follow = (user: IUser, auth: IAuth) => async(dispatch: Dispatch<IAuthType | IAlertType | IProfileType>) => {
   let newUser = {...user, followers: [...user.followers, auth.user]}
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
   try {
      await patchApi(`user/${user._id}/follow`, {}, auth.access_token);
   } catch(err: any) {
      return dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
   }
}

export const unfollow = (user: IUser, auth: IAuth) => async(dispatch: Dispatch<IAuthType | IAlertType | IProfileType>) => {
   let newUser = {...user, followers: user.followers.filter(f => f._id !== auth.user._id)}
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
   } catch(err: any) {
      return dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
   }
}