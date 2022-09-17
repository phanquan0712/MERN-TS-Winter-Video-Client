import { LIST_POST_NAME, IListPostNameType } from "../types/postType";

interface IState {
   listPostName: string;
   listPostSubName: string;
   idUser: string
}

const initialState: IState = {
   listPostName: "",
   listPostSubName: "",
   idUser: ""
}

const listPostNameReducer = (state: IState = initialState, action: IListPostNameType) => {
   switch (action.type) {
      case LIST_POST_NAME:
         return action.payload;
      default:
         return state;
   }
}

export default listPostNameReducer;