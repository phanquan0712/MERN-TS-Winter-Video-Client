import {
  GET_POST_FOLLOWING,
  UNLIKE_POST,
  GET_DETAIL_POST,
  IPostType,
  LIKE_POST,
  DELETE_POST,
  UPDATE_POST,
} from "./../types/postType";
import { postAPi, getApi, patchApi, deleteApi } from "./../../utils/FetchData";
import { Dispatch } from "react";
import { ALERT, IAlertType } from "../types/alertType";
import { AUTH, IAuth, IAuthType } from "../types/authType";
import { checkImage, imageUpload } from "../../utils/imageUpload";
import { GET_HOME_POST, IGetHomePostType } from "../types/homePostType";
import { IPost } from "../../utils/Typescript";

export const createPost =
  (data: any, auth: IAuth) => async (dispatch: Dispatch<IAlertType>) => {
    console.log(data)
    let url = "";
    let url2 = "";
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      if (data.video) {
        const check = checkImage(data.video as File);
        if (check) return dispatch({ type: ALERT, payload: { error: check } });
        const photo = await imageUpload(data.video as File);
        url = photo.url;
      }
      if (data.cover_img) {
        const check = checkImage(data.cover_img as File);
        if (check) return dispatch({ type: ALERT, payload: { error: check } });
        const photo = await imageUpload(data.cover_img as File);
        url2 = photo.url;
      }

      console.log({
        ...data,
        video: url,
        cover_img: url2,
        user: auth.user._id,
      });
      const res = await postAPi(
        "post",
        {
          ...data,
          video: url,
          cover_img: url2,
          user: auth.user._id,
        },
        auth.access_token
      );
      if (res.data.success) {
        window.location.href = "/";
      }
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
    }
  };

export const getHomePost =
  () => async (dispatch: Dispatch<IGetHomePostType | IAlertType>) => {
    try {
      const res = await getApi("post");
      dispatch({ type: GET_HOME_POST, payload: { ...res.data } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
    }
  };

export const likePost =
  (post: IPost, auth: IAuth) =>
    async (dispatch: Dispatch<IAlertType | IPostType | IAuthType>) => {
      const newPost = { ...post, likes: [...post.likes, auth.user._id] };
      dispatch({ type: LIKE_POST, payload: newPost as IPost });
      dispatch({
        type: AUTH,
        payload: {
          ...auth,
          user: {
            ...auth.user,
            liked: [...auth.user.liked, newPost as IPost],
          },
        },
      });
      dispatch({ type: GET_DETAIL_POST, payload: newPost as IPost });
      try {
        await patchApi(`post/${post._id}/like`, {}, auth.access_token);
      } catch (err: any) {
        dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
      }
    };

export const unLikePost =
  (post: IPost, auth: IAuth) =>
    async (dispatch: Dispatch<IAlertType | IPostType | IAuthType>) => {
      const newPost = {
        ...post,
        likes: post.likes.filter((item) => item !== auth.user._id),
      };
      dispatch({ type: UNLIKE_POST, payload: newPost });
      dispatch({
        type: AUTH,
        payload: {
          ...auth,
          user: {
            ...auth.user,
            liked: auth.user.liked.filter((item) => item._id !== newPost._id),
          },
        },
      });
      dispatch({ type: GET_DETAIL_POST, payload: newPost });
      try {
        await patchApi(`post/${post._id}/unlike`, {}, auth.access_token);
      } catch (err: any) {
        dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
      }
    };

export const getPostFollowing =
  (token: string) =>
    async (dispatch: Dispatch<IAlertType | IPostType | IAuthType>) => {
      try {
        const res = await getApi("post_following", token);
        dispatch({ type: GET_POST_FOLLOWING, payload: res.data });
      } catch (err: any) {
        dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
      }
    };

export const getDetailPost =
  (id: string) =>
    async (dispatch: Dispatch<IAlertType | IPostType | IAuthType>) => {
      try {
        const res = await getApi(`post_detail/${id}`);
        dispatch({ type: GET_DETAIL_POST, payload: res.data.post });
      } catch (err: any) {
        dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
      }
    };

export const deletePost =
  (id: string, auth: IAuth) =>
    async (dispatch: Dispatch<IAlertType | IPostType | IAuthType>) => {
      try {
        dispatch({ type: ALERT, payload: { loading: true } });
        const res = await deleteApi(`post/${id}`, auth.access_token);
        dispatch({ type: ALERT, payload: { success: res.data.msg } });
        window.location.href = "/";
      } catch (err: any) {
        dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
      }
    };

export const updatePost =
  (roleWatcher: string, isComment: boolean, id: string, token: string) =>
    async (dispatch: Dispatch<IAlertType | IPostType | IAuthType>) => {
      dispatch({ type: UPDATE_POST, payload: { roleWatcher, isComment } });
      try {
        dispatch({ type: ALERT, payload: { loading: true } });
        await patchApi(`post/${id}`, { roleWatcher, isComment }, token);
        dispatch({ type: ALERT, payload: { loading: false } });
      } catch (err: any) {
        dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
      }
    };
