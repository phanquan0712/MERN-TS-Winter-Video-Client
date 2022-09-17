import { INotify } from './../../utils/Typescript';
import { getApi } from './../../utils/FetchData';
import { GET_NOTIFY } from './../types/notifyType';
import { IAuth } from './../types/authType';
import { Dispatch } from "redux";
import { ALERT, IAlertType } from "../types/alertType";
import { INotifyType } from "../types/notifyType";
import { Socket } from 'socket.io-client';
import { postAPi } from '../../utils/FetchData';

export const createNotify = (notify: INotify, auth: IAuth, socket: Socket) => async (dispatch: Dispatch<IAlertType | INotifyType>) => {
   try  {
      const res = await postAPi('notify', notify, auth.access_token)
      socket.emit('createNotify', {
         ...res.data.notify,
         user: auth.user
      })
   } catch(err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg }})
   }
}


export const getNotifies = (token: string) => async (dispatch: Dispatch<IAlertType | INotifyType>) => {
   try  {
      const res = await getApi('notify', token)
      dispatch({ type: GET_NOTIFY, payload: res.data.notifies })
   } catch(err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg }})
   }
}