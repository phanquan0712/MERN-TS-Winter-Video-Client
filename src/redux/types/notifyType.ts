import { IUser, INotify } from "../../utils/Typescript";

export const CREATE_NOTIFY = 'CREATE_NOTIFY';
export const DELETE_NOTIFY = 'DELETE_NOTIFY';
export const GET_NOTIFY = 'GET_NOTIFY';
export const UPDATE_NOTIFY = 'UPDATE_NOTIFY';
export const DELETE_ALL_NOTIFY = 'DELETE_ALL_NOTIFY';
export const UPDATE_SOUND = 'UPDATE_SOUND';


export interface IStateType {
   load: boolean
   data: INotify[]
}


export interface ICreateNotifyType {
   type: typeof CREATE_NOTIFY;
   payload: INotify;
}

export interface IDeleteNotifyType {
   type: typeof DELETE_NOTIFY;
   payload: string;
}

export interface IUpdateNotifyType {
   type: typeof UPDATE_NOTIFY;
   payload: INotify;
}


export interface IGetNotifyType {
   type: typeof GET_NOTIFY;
   payload: INotify[];
}


export type INotifyType = ICreateNotifyType | IDeleteNotifyType | IGetNotifyType | IUpdateNotifyType;