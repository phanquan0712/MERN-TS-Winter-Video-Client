import { IUser } from "../../utils/Typescript";


export const GET_SUGGESTION_USER = 'GET_SUGGESTION_USER';



export interface ISuggestionUserType {
   type: typeof GET_SUGGESTION_USER,
   payload: IUser[]
}