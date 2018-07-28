import {
	STORE_VIDEO_LIST,
	STORE_CLICKED_VIDEO_INFO,
	VIDEO_GRID_SCREEN_INITIAL_STATE,
	REMOVE_PREV_FOLDER_NAME
} from './types';

import { CameraRoll } from 'react-native';

export const videoGridScreenInitialState = () => {
	return ({ type: VIDEO_GRID_SCREEN_INITIAL_STATE });
};

export const storeClickedVideoInfo = (item) => {
	return ({
		type: STORE_CLICKED_VIDEO_INFO,
		payload: item
	});
}

export const removePrevFolderName = () => {
	return ({ type: REMOVE_PREV_FOLDER_NAME });
}

export const getVideoList = (folderName, numOfVideos) => async (dispatch, getState) => {
	const { photosAfter, prevFolderName, dataSource } = getState().videoGridReducer;	
	let r = await CameraRoll.getPhotos({
		first: numOfVideos,
		after: photosAfter === null ? undefined : photosAfter,
		assetType: 'Videos',
		groupName: folderName
	});
	if(r) {
		let prevDataSource = {};
		if(prevFolderName === folderName) {
			prevDataSource = dataSource;
		}
		dispatch({
			type: STORE_VIDEO_LIST,
			payload: r,
			prevFolderName: folderName,
			prevDataSource: prevDataSource
		});
	}
}