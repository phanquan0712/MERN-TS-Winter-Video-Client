import { AUTH_MODAL, IAuthModalType} from "../types/authType";



const authReducer = (state: boolean = false, action: IAuthModalType) => {
   switch (action.type) {
      case AUTH_MODAL:
         return action.payload;
      default:
         return state;
   }
}

export default authReducer;
