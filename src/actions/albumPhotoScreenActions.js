import { 
	SAVE_ALBUM_NAME,
	REMOVE_PREV_ALBUM_NAME,
	STORE_ALBUM_PHOTOS,
	ALBUM_PHOTO_SCREEN_INITIAL_STATE
} from './types';
import { CameraRoll } from 'react-native';

export const albumPhotoScreenInitialState = () => {
	return ({ type: ALBUM_PHOTO_SCREEN_INITIAL_STATE });
}

export const saveAlbumName = (albumName) => {
	return ({
		type: SAVE_ALBUM_NAME,
		payload: albumName
	});
};

export const removePrevAlbumName = () => {
	return ({ type: REMOVE_PREV_ALBUM_NAME });
};

export const getAlbumImages = (albumName, numOfImages) => async ( dispatch, getState ) => {
	const { photosAfter, prevAlbumName, dataSource, images } = getState().albumPhotoReducer;
	let r = await CameraRoll.getPhotos({
		first: numOfImages,
		after: photosAfter === null ? undefined : photosAfter,
		assetType: 'Photos',
		groupName: albumName
	});
	if(r) {
		let prevDataSource = {};
		let img = [];
		if(prevAlbumName === albumName) {
			prevDataSource = dataSource;
			img = images;
		}
		dispatch({
			type: STORE_ALBUM_PHOTOS,
			payload: r,
			prevAlbumName: albumName,
			images: img,
			prevDataSource: prevDataSource
		});
	}
}
