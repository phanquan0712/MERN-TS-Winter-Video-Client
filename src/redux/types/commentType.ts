import { IComment } from "../../utils/Typescript"

export const ANSWER_COMMENT = 'ANSWER_COMMENT'
export const MDCM = 'MDCM'

export interface IAnswerCommentType {
      type: typeof ANSWER_COMMENT,
      payload: IComment
}

export interface IMdcmType {
      type: typeof MDCM,
      payload: boolean
}

export type ICommentType = IAnswerCommentType | IMdcmType