import {
	MODAL_VISIBLE,
	MODAL_INVISIBLE,
	CHANGE_IMAGE_INDEX
} from './types';

export const openImageModal = (index) => {
	return ({ type: MODAL_VISIBLE, payload: index });
};

export const closeImageModal = () => {
	return ({ type: MODAL_INVISIBLE });
};

export const changeCurrentlyVisibleImageIndex = (index) => {
	return ({ type: CHANGE_IMAGE_INDEX, payload: index });
};
