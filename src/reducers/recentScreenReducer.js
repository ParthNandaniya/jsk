import { 
	STORE_RECENT_PHOTOS,
	RECENT_SCREEN_INITIAL_STATE
} from '../actions/types';

const INITIAL_STATE = {
	dataSource: [],
	images: [],
	photosAfter: null,
	has_next_page: true,
	refreshing: false
}

export default ( state = INITIAL_STATE, action ) => {
	switch(action.type) {
		case STORE_RECENT_PHOTOS:
			return { 
				...state, 
				dataSource: [ ...action.prevDataSource , ...action.payload.edges ],
				images: action.images,
				photosAfter: action.payload.page_info.end_cursor,
				has_next_page: action.payload.page_info.has_next_page,
				refreshing: false
			};
		case RECENT_SCREEN_INITIAL_STATE:
			return { ...state, ...INITIAL_STATE, refreshing: true };
		default:
			return state;
	}
}
