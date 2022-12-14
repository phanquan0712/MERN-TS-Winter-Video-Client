import { AUTH, IAuth, IAuthType} from "../types/authType";



const authReducer = (state: IAuth = {} as IAuth, action: IAuthType) => {
   switch (action.type) {
      case AUTH:
         return action.payload;
      default:
         return state;
   }
}

export default authReducer;
