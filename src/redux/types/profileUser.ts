 import { IPost, IUser } from '../../utils/Typescript';
 
 
export const GET_PROFILE_USER = 'GET_PROFILE_USER';
export const FOLLOW = 'FOLLOW';
export const UNFOLLOW = 'UNFOLLOW';
export const UPDATE_LIST_POST_PROFILE = 'UPDATE_LIST_POST_PROFILE';
export const SEARCH_USER = 'SEARCH_USER';
export const LOAD_SEARCH = "LOAD_SEARCH";
export const GET_DISCOVER_USER = 'GET_DISCOVER_USER';

export interface IGetProfileUserType {
      type: typeof GET_PROFILE_USER;
      payload: IUser;
}

export interface IFollowUserType {
      type: typeof FOLLOW;
      payload: IUser;
}

export interface IUnFollowUserType {
      type: typeof UNFOLLOW;
      payload: IUser;
}

export interface IUpdatePostProfileUserType {
      type: typeof UPDATE_LIST_POST_PROFILE;
      payload: IUser;
}

export interface ISearchUserType {
      type: typeof SEARCH_USER;
      payload: IUser[];
}

export interface ILoadSearchType {
      type: typeof LOAD_SEARCH;
      payload: boolean
}

export interface IGetDiscoverUserType {
      type: typeof GET_DISCOVER_USER;
      payload: {
            users: IUser[];
            total: number;
      }
}

export type IProfileType = IGetDiscoverUserType | ILoadSearchType |  ISearchUserType | IGetProfileUserType | IFollowUserType | IUnFollowUserType | IUpdatePostProfileUserType