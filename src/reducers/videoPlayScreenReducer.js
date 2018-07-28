import {
	STORE_CLICKED_VIDEO_INFO
} from '../actions/types';

const INITIAL_STATE= {
	videoInfo: {}
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type){
		case STORE_CLICKED_VIDEO_INFO:
			return { ...state, videoInfo: action.payload };
		default:
			return state;
	}
}
