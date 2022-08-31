import { IUserRegister } from './../../utils/Typescript';
import { postAPi, getApi } from './../../utils/FetchData';
import { IUserLogin } from "../../utils/Typescript";
import { Dispatch } from "react";
import { ALERT, IAlertType } from '../types/alertType';
import { AUTH, AUTH_MODAL, IAuthType, IAuthModalType, IAuth } from '../types/authType';
import { vailidPhoneNumber, ValidRegister } from '../../utils/valid';

export const login = (data: IUserLogin) => async(dispatch: Dispatch<IAlertType | IAuthType | IAuthModalType>) => {
   try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await postAPi('login', data);
      dispatch({ type: AUTH, payload: { 
         access_token: res.data.access_token,
         user: res.data.user
      } });
      dispatch({ type: AUTH_MODAL, payload: false  });
      localStorage.setItem('logged', 'winter')
      dispatch({ type: ALERT, payload: { success: 'Login success!' } });
   } catch(err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg }})
   }
}


export const register = (data: IUserRegister) => async(dispatch: Dispatch<IAlertType | IAuthModalType>) => {
   const check = ValidRegister(data);
   if(check) return dispatch({ type: ALERT, payload: { error: ValidRegister(data)}})
   try {
      dispatch({ type: ALERT, payload: { loading: true}})
      const res = await postAPi('register', data);
      dispatch({ type: AUTH_MODAL, payload: false  });
      dispatch({ type: ALERT, payload: { success: res.data.msg}})
   } catch(err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg }})
   }
}

export const refreshToken = () => async(dispatch: Dispatch<IAuthType | IAlertType>) => {
   const logged = localStorage.getItem('logged')
   if(logged !== 'winter') return;
   try {
      const res = await getApi('refresh_token');
      dispatch({ type: AUTH, payload: { 
         access_token: res.data.access_token,
         user: res.data.user
      } });
   } catch(err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg }})
      localStorage.removeItem('logged')
   }
}

export const logout = (auth: IAuth) => async(dispatch: Dispatch<IAuthType | IAlertType>) => {
   try {
      localStorage.removeItem('logged')
      await getApi('logout', auth.access_token);
      window.location.href = '/';
   } catch(err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg }})
   }
}

export const googleLogin = (id: string) => async(dispatch: Dispatch<IAuthType | IAlertType | IAuthModalType>) => {
   try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await postAPi('google_login', { id });
      console.log(res);
      dispatch({ type: AUTH, payload: { 
         access_token: res.data.access_token,
         user: res.data.user
      } });
      dispatch({ type: AUTH_MODAL, payload: false  });
      localStorage.setItem('logged', 'winter')
      dispatch({ type: ALERT, payload: { success: 'Login success!' } });
   } catch(err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg }})
   }
}


export const facebookLogin = (token: string, id: string) => async(dispatch: Dispatch<IAuthType | IAlertType | IAuthModalType>) => {
   try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await postAPi('facebook_login', { token, id });
      dispatch({ type: AUTH, payload: { 
         access_token: res.data.access_token,
         user: res.data.user
      } });
      dispatch({ type: AUTH_MODAL, payload: false  });
      localStorage.setItem('logged', 'winter')
      dispatch({ type: ALERT, payload: { success: 'Login success!' } });
   } catch(err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg }})
   }
}


export const loginSms = (phone: string) => async(dispatch: Dispatch<IAuthType | IAlertType | IAuthModalType>) => {
   if(!vailidPhoneNumber(phone)) return dispatch({ type: ALERT, payload: { error: 'Invalid phone number' }})
   try {
      const res = await postAPi('login_sms', { phone });
      console.log(res);
      if(!res.data.valid) {
         dispatch({ type: ALERT, payload: { success: 'Success!, please check your phone number!' } });
      } else {
         dispatch({ type: ALERT, payload: { error: 'Send code to phone number failed!' } });
      }
   } catch(err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg }})
   }
}

export const verifySms = (phone: string, code: string) => async(dispatch: Dispatch<IAuthType | IAlertType | IAuthModalType>) => {
   try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await postAPi('verify_sms', { phone, code }); 
      dispatch({
         type: AUTH,
         payload: res.data
      })
      dispatch({
         type: ALERT,
         payload: { success: "Login Success!" }
      })
      localStorage.setItem('logged', 'winter')
      dispatch({ type: ALERT, payload: { success: 'Login success!' } });
   } catch(err: any) {
      dispatch({ type: ALERT, payload: { error: err.response.data.msg }})
   }
}