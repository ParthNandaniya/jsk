import {
	ALBUM_MODAL_VISIBLE,
	ALBUM_MODAL_INVISIBLE,
	CHANGE_ALBUM_IMAGE_INDEX
} from '../actions/types';

const INITIAL_STATE = {
	modalVisible: false,
	currentlyVisibleImageIndex: 0
};

export default ( state = INITIAL_STATE, action ) => {
	switch (action.type) {
		case ALBUM_MODAL_VISIBLE:
			return { ...state, modalVisible: true, currentlyVisibleImageIndex: action.payload };
		case ALBUM_MODAL_INVISIBLE:
			return { ...state, modalVisible: false, currentlyVisibleImageIndex: 0 };
		case CHANGE_ALBUM_IMAGE_INDEX:
			return { ...state, currentlyVisibleImageIndex: action.payload };
		default:
			return state;
	}
}
