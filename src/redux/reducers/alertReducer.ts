import { ALERT, IAlert, IAlertType} from "../types/alertType";


const alertReducer = (state: IAlert = {}, action: IAlertType) => {
   switch (action.type) {
      case ALERT:
         return action.payload;
      default:
         return state;
   }
}

export default alertReducer;
