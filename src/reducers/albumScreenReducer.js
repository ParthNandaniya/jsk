import {
	STORE_ALBUM_LIST,
	ALBUM_SCREEN_INITIAL_STATE
} from '../actions/types';

const INITIAL_STATE = {
	albumList: [],
	refreshing: false
}

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case STORE_ALBUM_LIST:
			return { ...state, albumList: action.payload, refreshing: false };
		case ALBUM_SCREEN_INITIAL_STATE:
			return { ...state, albumList: [], refreshing: true };
		default:
			return state;
	}
}
