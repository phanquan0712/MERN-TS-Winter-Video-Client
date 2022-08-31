import { IUser, IPost, IComment } from "../../utils/Typescript";

export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const GET_POST_FOLLOWING = "GET_POST_FOLLOWING";
export const GET_DETAIL_POST = "GET_DETAIL_POST";
export const CREATE_COMMENT_POST = "CREATE_COMMENT_POST";
export const CREATE_ANSWER_COMMENT_POST = "CREATE_ANSWER_COMMENT_POST";
export const LIKE_COMMENT = "LIKE_COMMENT";
export const LIKE_ANSWER_COMMENT = "LIKE_ANSWER_COMMENT";
export const DELETE_POST = "DELETE_POST";
export const DELETE_COMMENT_POST = "DELETE_COMMENT_POST";
export const DELETE_ANSWER_COMMENT_POST = "DELETE_ANSWER_COMMENT_POST";
export const UPDATE_POST = "UPDATE_POST";

export interface ILikePostType {
  type: typeof LIKE_POST | typeof UNLIKE_POST;
  payload: IPost;
}

export interface IGetPostFollowingType {
  type: typeof GET_POST_FOLLOWING;
  payload: {
    posts: IPost[];
    total: number;
  };
}

export interface IGetDetailPostType {
  type: typeof GET_DETAIL_POST;
  payload: IPost;
}

export interface ICreateCommentPostType {
  type: typeof CREATE_COMMENT_POST;
  payload: IComment;
}

export interface ICreateAnswerCommentPostType {
  type: typeof CREATE_ANSWER_COMMENT_POST;
  payload: IComment;
}

export interface ILikeCommentPostType {
  type: typeof LIKE_COMMENT;
  payload: IComment;
}

export interface ILikeAnswerCommentPostType {
  type: typeof LIKE_ANSWER_COMMENT;
  payload: IComment;
}

export interface IDeleteCommentPostType {
  type: typeof DELETE_COMMENT_POST;
  payload: IComment;
}

export interface IDeleteAnswerCommentPostType {
  type: typeof DELETE_ANSWER_COMMENT_POST;
  payload: IComment;
}

export interface IUpdatePostType {
  type: typeof UPDATE_POST;
  payload: {
    roleWatcher: string;
    isComment: boolean;
  };
}

export type IPostType =
  | IUpdatePostType
  | IDeleteAnswerCommentPostType
  | IDeleteCommentPostType
  | ILikeAnswerCommentPostType
  | ILikeCommentPostType
  | ICreateAnswerCommentPostType
  | ICreateCommentPostType
  | IGetDetailPostType
  | ILikePostType
  | IGetPostFollowingType;
