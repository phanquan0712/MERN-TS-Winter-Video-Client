import { MDCM, ICommentType } from "../types/commentType";

const mdCmReducer = (state = false, action: ICommentType) => {
   switch (action.type) {
      case MDCM:
         return action.payload;
      default:
         return state;
   }
}

export default mdCmReducer;