import { IPost } from '../../utils/Typescript'

export const GET_HOME_POST = 'GET_HOME_POST'


export interface IGetHomePostType {
   type: typeof GET_HOME_POST,
   payload: {
      posts: IPost[]
      total: number
   }
}
