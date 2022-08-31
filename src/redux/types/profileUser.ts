import { IUser } from '../../utils/Typescript';

export const GET_PROFILE_USER = 'GET_PROFILE_USER';
export const FOLLOW = 'FOLLOW';
export const UNFOLLOW = 'UNFOLLOW';

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

export type IProfileType = IGetProfileUserType | IFollowUserType | IUnFollowUserType;