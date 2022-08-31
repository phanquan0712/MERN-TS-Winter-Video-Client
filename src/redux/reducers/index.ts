import { combineReducers } from 'redux';
import alertReducer from './alertReducer';
import authReducer from './authReducer';
import authModalReducer from './authModalReducer';
import suggestionUser from './suggestionUser';
import profileUser from './profileUserReducer';
import homePostReducer from './homePostReducer';
import followingPostReducer from './followingPostReducer';
import detailPostReducecr from './detailPostReducer';
import tagCommentReducer from './tagCommentReducer';
export default combineReducers({
   alert: alertReducer,
   auth: authReducer,
   authModal: authModalReducer,
   suggestionUser: suggestionUser,
   profileUser: profileUser,
   homePost: homePostReducer,
   followingPost: followingPostReducer,
   detailPost: detailPostReducecr,
   tagComment: tagCommentReducer,
})