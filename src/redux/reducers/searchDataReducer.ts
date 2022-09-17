import { IProfileType, SEARCH_USER, LOAD_SEARCH } from './../types/profileUser';
import { IPost, IUser } from "../../utils/Typescript";
import { SEARCH_POST, IPostType } from "../types/postType";


interface IState {
   posts: IPost[];
   users: IUser[];
   load: boolean
}

const initState: IState= {
   users: [],
   posts: [],
   load: false,
}

const searchData = (state: IState = initState, action: IPostType | IProfileType) => {
   switch(action.type) {
      case SEARCH_POST: 
         return {
            ...state,
            posts: action.payload 
         }
      case SEARCH_USER:
         return {
            ...state,
            users: action.payload
         }
      case LOAD_SEARCH:
         return {
            ...state,
            load: action.payload
         }
      default: 
         return state;
   }
}


export default searchData