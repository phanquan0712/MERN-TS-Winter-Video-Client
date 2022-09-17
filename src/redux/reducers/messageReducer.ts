import { ADD_CONVERSATION, ADD_MESSAGE, DELETE_CONVERSATION, DELETE_MESSAGE, GET_CONVERSATIONS, GET_MESSAGES, IMessageType, IStateType } from "../types/messageType";
import { IUserMess, IMessage, IUser } from "../../utils/Typescript";
const initState: IStateType = {
   conversations: [],
   totalConversations: 0,
   messages: [],
   totalMessage: 0,
   firstLoad: false,
   firstLoad2: false,
}

const moveToFisrt = (array: IUserMess[], data: IMessage) => {
   let ele: IUserMess | undefined = array.find(item => item._id === (data.recipient as IUser)?._id || item._id === (data.sender as IUser)?._id)
   if(ele) {
      const newArr = array.filter(item => item._id !== ele?._id)
      ele = { ...ele, text: data.text}
      return [ele, ...newArr]
   }
   return array
}

const addMessage = (array: IMessage[], data: IMessage) => {
   array = array.filter(item => (item.sender as IUser)?._id === (data.sender as IUser)?._id && (item.recipient as IUser)?._id === (data.recipient as IUser)?._id)
   return array
}

const messageReducer = (state = initState, action: IMessageType) => {
   switch(action.type) {
      case ADD_CONVERSATION:
         if(state.conversations.every(conversation => conversation._id !== action.payload._id)) {
            return {
               ...state,
               conversations: [ action.payload, ...state.conversations],
               totalConversations: state.totalConversations + 1
            }
         } else return state
         case ADD_MESSAGE:
            return {
               ...state,
               messages: [...state.messages, action.payload],
               totalMessage: state.totalMessage + 1,
               conversations: moveToFisrt(state.conversations, action.payload)
            }
         case GET_CONVERSATIONS:
            return {
               ...state,
               conversations: action.payload.conversations,
               totalConversations: action.payload.totalConversations,
               firstLoad: true
            }
         case GET_MESSAGES:
            return {
               ...state,
               messages: action.payload.messages.reverse(),
               totalMessage: action.payload.totalMessage,
               firstLoad2: true
            }
         case DELETE_CONVERSATION:
            return {
               ...state, 
               conversations: state.conversations.filter(conversation => conversation._id !== action.payload),
               totalConversations: state.totalConversations - 1,
               messages: [],
               totalMessage: 0
            }
         case DELETE_MESSAGE:
            return {
               ...state,
               messages: state.messages.filter(message => message._id !== action.payload),
               totalMessage: state.totalMessage - 1
            }
      default:
         return state
   }
}

export default messageReducer