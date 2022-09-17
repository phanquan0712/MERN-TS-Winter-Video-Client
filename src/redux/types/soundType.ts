

export const SET_SOUND = 'SET_SOUND';

export interface ISound {
   sound: number;
   isSound: boolean;
   firstLoad: boolean;
}


export interface ISoundType {
   type: typeof SET_SOUND;
   payload: ISound
}