import {
	STORE_VIDEO_GROUP_NAME,
	SAVE_VIDEO_FOLDER_NAME
} from './types';

import _ from 'lodash';
import { CameraRoll } from 'react-native';

export const saveVideoFolderName = (folderName) => {
	return ({ type: SAVE_VIDEO_FOLDER_NAME, payload: folderName });
}

export const storeVideoGroupName = () => async dispatch => {
	let r = await CameraRoll.getPhotos({
		first: 10000,
		assetType: 'Videos'
	});
	if(r) {
		let grp = [];
		r.edges.map(item => {
			grp.push({ name: item.node.group_name });
		});
		let group = _.uniqBy(grp, (e) => {
			return e.name;
		});
		dispatch({
			type: STORE_VIDEO_GROUP_NAME,
			payload: group
		});
	}
}