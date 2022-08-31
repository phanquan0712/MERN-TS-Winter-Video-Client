import { GET_POST_FOLLOWING, IPostType } from "../types/postType";
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
      default:
         return state
   }
}

export default followingPostReducer;