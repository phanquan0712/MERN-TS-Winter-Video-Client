import { GET_HOME_POST, IGetHomePostType } from "../types/homePostType";
import { IPost } from "../../utils/Typescript";
import { LIKE_POST, UNLIKE_POST, IPostType } from "../types/postType";


export interface IState {
   posts: IPost[];
   total: number
}

const initState: IState = {
   posts: [],
   total: 0 
}

export const homePostReducer = (state: IState = initState, action: IGetHomePostType | IPostType) => {
   switch (action.type) {
      case GET_HOME_POST:
         return action.payload;
      case LIKE_POST:
         return {
            ...state,
            posts: state.posts.map((post: IPost) => (
               post._id === action.payload._id ? action.payload : post
            ))
         }
      case UNLIKE_POST:
            return {
               ...state,
               posts: state.posts.map((post: IPost) => (
                  post._id === action.payload._id ? action.payload : post
               ))
            }
      default:
         return state;
   }
}

export default homePostReducer;