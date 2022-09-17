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
import messageReducer from './messageReducer';
import soundReducer from './soundReducer';
import socketReducer from './socketReducer';
import notifyReducer from './notifyReducer';
import mdCmReducer from './mdCmReducer';
import searchData from './searchDataReducer';
import discoverUser from './discoverUserReducer';
import mdSr from  './mdSrReducer';
import listPostNameReducer from './listPostNameReducer';
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
   message: messageReducer,
   sound: soundReducer,
   socket: socketReducer,
   notify: notifyReducer,
   mdCm: mdCmReducer,
   searchData: searchData,
   discoverUser: discoverUser,
   mdSr: mdSr,
   listPostName: listPostNameReducer,
})