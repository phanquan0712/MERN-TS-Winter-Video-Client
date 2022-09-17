import { SET_SOUND, ISound, ISoundType } from './../types/soundType';

const initialState: ISound = {
   sound: 100,
   isSound: false,
   firstLoad: false
}

const soundReducer = (state = initialState, action: ISoundType) => {
   switch(action.type) {
      case SET_SOUND:
         return {
            ...state,
            ...action.payload
         }
      default: 
         return state;
   }
}

export default soundReducer;