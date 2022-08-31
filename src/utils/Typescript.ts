import { ChangeEvent, FormEvent, MouseEvent, KeyboardEvent  } from "react"
import rootReducer from '../redux/reducers/index'

export type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement |  HTMLSelectElement >
export type MouseClick = MouseEvent<HTMLDivElement | MouseEvent>
export type KeyboardClick = KeyboardEvent<HTMLDivElement | KeyboardEvent | HTMLTextAreaElement>
export type FormSubmit = FormEvent<HTMLFormElement>
export type RootStore = ReturnType<typeof rootReducer>

export interface IParams {
   page? : string,
   slug?: string
}

export interface IUserLogin {
   account: string
   password: string
}

export interface IUserRegister extends IUserLogin {
   winterId: string
   name: string
   cf_password: string
}

export interface IUser {
   _id?: string
   winterId: string
   name: string
   account: string
   password: string
   avatar: string
   role: string
   type: string
   story: string
   followers: IUser[]
   following: IUser[]
   liked: IPostThumb[]
   videos?: IPostThumb[]
   createdAt?: string
   _doc: Document
}

export interface IUpdateProfile {
   avatar: File | string
   winterId: string
   name: string
   story: string
}



export interface IPost {
   _id: string
   user: IUser
   comments: IComment[]
   likes: string[]
   video: string
   cover_img?: string
   note: string
   isComment: boolean
   roleWatcher: string
   createdAt?: string
   _doc: Document
}

export interface IPostThumb  {
   _id: string
   video: string
   likes: string[]
}


export interface IComment {
   _id?: string
   user: IUser
   postId: IPost
   postUserId: IUser
   content: string
   likes: string[]
   tag?: IUser
   comment_root?: IComment | string
   reply: IComment[]
   createdAt?: string
   _doc?: Document
}