 import {
 	STORE_VIDEO_GROUP_NAME
 } from '../actions/types';

const INITIAL_STATE = {
	videoGroupName: []
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type){
		case STORE_VIDEO_GROUP_NAME:
			return { ...state, videoGroupName: action.payload };
		default:
			return state;
	}
}
