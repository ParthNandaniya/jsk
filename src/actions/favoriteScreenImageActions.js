import {
	FAVORITE_MODAL_VISIBLE,
	FAVORITE_MODAL_INVISIBLE,
	CHANGE_FAVORITE_IMAGE_INDEX
} from './types';

export const openFavoriteImageModal = (index) => {
	return ({ type: FAVORITE_MODAL_VISIBLE, payload: index });
};

export const closeFavoriteImageModal = () => {
	return ({ type: FAVORITE_MODAL_INVISIBLE });
};

export const changeFavoritesCurrentlyVisibleImageIndex = index => (dispatch, getState) => {
	const { likedPhotos } = getState().favoriteReducer;
	if(!(index === 0)) {
		dispatch({ type: CHANGE_FAVORITE_IMAGE_INDEX, payload: index-1 });
	} else {
		if(!(likedPhotos.length === 0)) {
			dispatch({ type: CHANGE_FAVORITE_IMAGE_INDEX, payload: index+1 });
		} else {
			dispatch({ type: FAVORITE_MODAL_INVISIBLE });
		}
	}
	
};
