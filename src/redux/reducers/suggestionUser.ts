import { GET_SUGGESTION_USER, ISuggestionUserType } from "../types/suggestionUser";
import { IUser } from "../../utils/Typescript";

const suggestionUser = (state: IUser[] = [], action: ISuggestionUserType) => {
   switch (action.type) {
      case GET_SUGGESTION_USER:
         return action.payload;
      default:
         return state;
   }
}

export default suggestionUser;