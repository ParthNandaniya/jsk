import { 
	STORE_RECENT_PHOTOS,
	RECENT_SCREEN_INITIAL_STATE
} from './types';
import { CameraRoll } from 'react-native';

export const recentScreenInitialState = () => {
	return ({ type: RECENT_SCREEN_INITIAL_STATE });
};

export const getRecentPhotos = (numberOfPhotos) => async ( dispatch, getState ) => {
	const { photosAfter, images } = getState().recentReducer;
	let r = await CameraRoll.getPhotos({
		first: numberOfPhotos,
		after: photosAfter === null ? undefined : photosAfter,
		assetType: 'Photos',
	});
	if(r) {
		let img = [];
		images.map((item, index) => {
			img.push({ index: index, url: item.url });
		});	
		let imgLength = img.length;
		r.edges.map((item, index) => {
			img.push({ index: imgLength+index, url: item.node.image.uri });
		});
		dispatch({
			type: STORE_RECENT_PHOTOS,
			payload: r,
			images: img,
			prevDataSource: getState().recentReducer.dataSource
		});
	}
}
