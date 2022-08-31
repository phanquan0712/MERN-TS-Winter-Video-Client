import { IComment } from "../../utils/Typescript"

export const ANSWER_COMMENT = 'ANSWER_COMMENT'


export interface IAnswerCommentType {
      type: typeof ANSWER_COMMENT,
      payload: IComment
}


export type ICommentType = IAnswerCommentType