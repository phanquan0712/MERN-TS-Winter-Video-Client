import { GET_PROFILE_USER,IProfileType, FOLLOW, UNFOLLOW } from "../types/profileUser";
import { IUser } from "../../utils/Typescript";



const initState: {
   users: IUser[];
} =  {
   users: [],
}

export const profileUserReducer = (state = initState, action: IProfileType) => {
   switch (action.type) {
      case GET_PROFILE_USER:
         return {
            ...state, 
            users: [...state.users, action.payload]
         }
      case FOLLOW: 
         return {
            ...state,
            users: state.users.map((user: IUser) => (
               user._id === action.payload._id ? action.payload : user
            ))
         }
      case UNFOLLOW: 
         return {
            ...state,
            users: state.users.map((user: IUser) => (
               user._id === action.payload._id ? action.payload : user
            ))
         }
      default:
         return state;
   }
}

export default profileUserReducer