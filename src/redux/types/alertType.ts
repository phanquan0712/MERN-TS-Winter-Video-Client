

export const ALERT = 'ALERT';

export interface IAlert {
   error?: string | string []
   success?: string | string []
   loading?: boolean
}

export interface IAlertType {
   type: typeof ALERT;
   payload: IAlert
}
