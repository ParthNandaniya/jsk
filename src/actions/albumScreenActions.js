import {
	STORE_ALBUM_LIST,
	ALBUM_SCREEN_INITIAL_STATE
} from './types';

import Albums from 'react-native-albums';

export const albumScreenInitialState = () => {
	return ({ type: ALBUM_SCREEN_INITIAL_STATE });
};

export const getAlbumList = () => async dispatch => {
	let r = await Albums.getAlbumList({
   	    count: true,
        thumbnail: true,
        thumbnailDimensions: true
    });
	if(r) {
		dispatch({ type: STORE_ALBUM_LIST, payload: r });
	}
};
