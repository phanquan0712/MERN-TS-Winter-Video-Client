import {
  LIKE_COMMENT,
  LIKE_ANSWER_COMMENT,
  DELETE_COMMENT_POST,
  DELETE_ANSWER_COMMENT_POST,
  UPDATE_POST,
} from "./../types/postType";
import {
  GET_DETAIL_POST,
  IPostType,
  CREATE_COMMENT_POST,
  CREATE_ANSWER_COMMENT_POST,
} from "../types/postType";
import { IPost, IComment } from "../../utils/Typescript";

const detailPostReducecr = (state: IPost = {} as IPost, action: IPostType) => {
  switch (action.type) {
    case GET_DETAIL_POST:
      return action.payload;
    case CREATE_COMMENT_POST:
      return {
        ...state,
        comments: [action.payload, ...state.comments],
      };
    case CREATE_ANSWER_COMMENT_POST:
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment._id ===
          (typeof action.payload.comment_root === "string"
            ? action.payload.comment_root
            : (action.payload.comment_root as IComment)?._id)
            ? {
                ...comment,
                reply: [action.payload, ...comment.reply],
              }
            : comment
        ),
      };
    case LIKE_COMMENT:
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment._id === action.payload._id ? action.payload : comment
        ),
      };
    case LIKE_ANSWER_COMMENT:
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment._id === action.payload.comment_root
            ? {
                ...comment,
                reply: comment.reply.map((reply) =>
                  reply._id === action.payload._id ? action.payload : reply
                ),
              }
            : comment
        ),
      };
    case DELETE_COMMENT_POST:
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment._id !== action.payload._id
        ),
      };
    case DELETE_ANSWER_COMMENT_POST:
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment._id === action.payload.comment_root
            ? {
                ...comment,
                reply: comment.reply.filter(
                  (reply) => reply._id !== action.payload._id
                ),
              }
            : comment
        ),
      };
    case UPDATE_POST:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default detailPostReducecr;
