import { GET_POST_FOLLOWING, UPDATE_LIST_POST_FL, IPostType, LIKE_POST, UNLIKE_POST } from "../types/postType";
import { IPost } from "../../utils/Typescript";

interface IState {
   posts: IPost[]
   total: number
}

const initState: IState = {
   posts: [],
   total: 0
}

const followingPostReducer = (state: IState = initState, action: IPostType) => {
   switch (action.type) {
      case GET_POST_FOLLOWING:
         return action.payload;
      case UPDATE_LIST_POST_FL:
         return {
            ...state,
            posts: state.posts.map(item => (
               item._id === action.payload._id ? action.payload : item
            ))
         }
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
         return state
   }
}

export default followingPostReducer;