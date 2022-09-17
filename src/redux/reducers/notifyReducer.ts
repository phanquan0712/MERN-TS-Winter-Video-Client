import { CREATE_NOTIFY, DELETE_NOTIFY, GET_NOTIFY, DELETE_ALL_NOTIFY, IStateType, INotifyType } from "../types/notifyType";

const initState: IStateType = {
   load: false,
   data: [],
}

const notifyReducer = (state: IStateType = initState, action: INotifyType) => {
   switch (action.type) {
      case GET_NOTIFY:
         return {
            ...state,
            data: action.payload
         }
      case CREATE_NOTIFY:
         return {
            ...state,
            data: [action.payload, ...state.data]
         }
      case DELETE_NOTIFY:
         return {
            ...state,
            data: state.data.filter(item => (
               item._id !== action.payload || item.url !== action.payload
            ))
         }
      default:
         return state
   }
}

export default notifyReducer