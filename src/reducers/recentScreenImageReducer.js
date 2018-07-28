import {
	MODAL_VISIBLE,
	MODAL_INVISIBLE,
	CHANGE_IMAGE_INDEX
} from '../actions/types';

const INITIAL_STATE = {
	modalVisible: false,
	currentlyVisibleImageIndex: 0
};

export default ( state = INITIAL_STATE, action ) => {
	switch (action.type) {
		case MODAL_VISIBLE:
			return { ...state, modalVisible: true, currentlyVisibleImageIndex: action.payload };
		case MODAL_INVISIBLE:
			return { ...state, modalVisible: false, currentlyVisibleImageIndex: 0 };
		case CHANGE_IMAGE_INDEX:
			return { ...state, currentlyVisibleImageIndex: action.payload };
		default:
			return state;
	}
}
