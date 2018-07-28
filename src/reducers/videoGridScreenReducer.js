import {
	SAVE_VIDEO_FOLDER_NAME,
	STORE_VIDEO_LIST,
	VIDEO_GRID_SCREEN_INITIAL_STATE,
	REMOVE_PREV_FOLDER_NAME
} from '../actions/types';

const INITIAL_STATE = {
	folderName: '',
	dataSource: [],
	photosAfter: null,
	has_next_page: true,
	prevFolderName: '',
	refreshing: false
}

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case SAVE_VIDEO_FOLDER_NAME:
			return { ...state, folderName: action.payload };
		case REMOVE_PREV_FOLDER_NAME:
			return { ...state, prevFolderName: '' };
		case STORE_VIDEO_LIST:
			return { 
				...state, 
				prevFolderName: action.prevFolderName,
				dataSource: [ ...action.prevDataSource , ...action.payload.edges ],
				photosAfter: action.payload.page_info.end_cursor,
				has_next_page: action.payload.page_info.has_next_page,
				refreshing: false
			};
		case VIDEO_GRID_SCREEN_INITIAL_STATE:
			return { ...state,
				dataSource: [],
				photosAfter: null,
				has_next_page: false,
				prevFolderName: '',
				refreshing: true
			};
		default:
			return state;
	}
}
