import {
	SAVE_LIKED_IMAGE
} from '../actions/types';

const INITIAL_STATE = {
	likedPhotos: []
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SAVE_LIKED_IMAGE:
			return { ...state, likedPhotos: action.payload };
		default:
			return state;
	}
};
