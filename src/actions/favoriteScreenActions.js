import {
	SAVE_LIKED_IMAGE
} from './types';
import { 
	AsyncStorage 
} from 'react-native';

import _ from 'lodash';

export const restoreLikedPhotos = (likedPhotos) => {
	return({ type: SAVE_LIKED_IMAGE, payload: likedPhotos });
};

export const saveLikedImage = (result, finalResult) =>  (dispatch, getState) => {
	const { likedPhotos, images } = getState().favoriteReducer;
	if(finalResult) {

		const newLikedPhotos = _.filter(likedPhotos, (e) => {
			return !(e.url === finalResult.url);
		});
		
		newLikedPhotos.map((item, index) => {
			item.index = index;
		});
		dispatch({ type: SAVE_LIKED_IMAGE, payload:  newLikedPhotos });
	} else {
		const likedPhotosLength = likedPhotos.length;
		dispatch({ 
			type: SAVE_LIKED_IMAGE,
			payload: [ ...likedPhotos, { url: result.url, index: likedPhotosLength } ],
		});
	}
};
