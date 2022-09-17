import { GET_DISCOVER_USER, IProfileType } from './../types/profileUser';
import { IUser } from '../../utils/Typescript';

interface IState {
   users: IUser[];
   total: number;
}

const initState = {
      users: [],
      total: 0
}

const discoverUserReducer = (state: IState = initState, action: IProfileType) => {
   switch(action.type) {
      case GET_DISCOVER_USER:
         return action.payload;
      default:
         return state; 
   }
}

export default discoverUserReducer;