import { ANSWER_COMMENT, ICommentType } from "../types/commentType";
import { IComment } from "../../utils/Typescript";
const tagCommentReducer = (state: IComment = {} as IComment, action: ICommentType) => {
   switch (action.type) {
      case ANSWER_COMMENT:
         return action.payload;
      default:
         return state;
   }
}

export default tagCommentReducer;