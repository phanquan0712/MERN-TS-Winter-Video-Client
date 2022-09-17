import { MDSR, IMdSrType } from "../types/postType";

const mdCmReducer = (state = false, action: IMdSrType) => {
   switch (action.type) {
      case MDSR:
         return action.payload;
      default:
         return state;
   }
}

export default mdCmReducer;