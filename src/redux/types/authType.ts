import { IUser } from '../../utils/Typescript';

export const AUTH = 'AUTH';
export const AUTH_MODAL = 'AUTH_MODAL';


export interface IAuth {
   user: IUser
   access_token: string
}

export interface IAuthModalType {
   type: typeof AUTH_MODAL
   payload: boolean
}

export interface IAuthType {
   type: typeof AUTH;
   payload: IAuth
}
