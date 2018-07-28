import {
	ALBUM_MODAL_VISIBLE,
	ALBUM_MODAL_INVISIBLE,
	CHANGE_ALBUM_IMAGE_INDEX
} from './types';

export const openAlbumImageModal = (index) => {
	return ({ type: ALBUM_MODAL_VISIBLE, payload: index });
};

export const closeAlbumImageModal = () => {
	return ({ type: ALBUM_MODAL_INVISIBLE });
};

export const changeAlbumsCurrentlyVisibleImageIndex = (index) => {
	return ({ type: CHANGE_ALBUM_IMAGE_INDEX, payload: index });
};
