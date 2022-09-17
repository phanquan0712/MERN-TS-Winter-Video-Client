import { IUserMess, IMessage } from "../../utils/Typescript"
export const ADD_CONVERSATION = 'ADD_CONVERSATION'
export const ADD_MESSAGE = 'ADD_MESSAGE'
export const GET_CONVERSATIONS = 'GET_CONVERSATIONS'
export const GET_MESSAGES = 'GET_MESSAGES'
export const DELETE_CONVERSATION = 'DELETE_CONVERSATION'
export const DELETE_MESSAGE = 'DELETE_MESSAGE'


export interface IStateType {
   conversations: IUserMess[]
   totalConversations: number
   messages: IMessage[]
   totalMessage: number
   firstLoad: boolean
   firstLoad2: boolean
}

export interface IAddConversationtype {
   type: typeof ADD_CONVERSATION
   payload: IUserMess
}

export interface IAddMessageType {
   type: typeof ADD_MESSAGE
   payload: IMessage
}

export interface IGetConversationsType {
   type: typeof GET_CONVERSATIONS
   payload: {
      conversations: IUserMess[]
      totalConversations: number
   }
}


export interface IGetMessagesType {
   type: typeof GET_MESSAGES
   payload: {
      messages: IMessage[]
      totalMessage: number
   }
}

export interface IDeleteConversationType {
   type: typeof DELETE_CONVERSATION
   payload: string
}

export interface IDeleteMessageType {
   type: typeof DELETE_MESSAGE
   payload: string
}

export type IMessageType = IDeleteConversationType | IDeleteMessageType |   IAddConversationtype | IAddMessageType | IGetConversationsType | IGetMessagesType