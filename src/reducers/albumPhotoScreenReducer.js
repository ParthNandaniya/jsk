import { 
	SAVE_ALBUM_NAME,
	REMOVE_PREV_ALBUM_NAME,
	STORE_ALBUM_PHOTOS,
	ALBUM_PHOTO_SCREEN_INITIAL_STATE
} from '../actions/types';

const INITIAL_STATE = {
	dataSource: [],
	images: [],
	photosAfter: null,
	has_next_page: true,
	albumName: '',
	prevAlbumName: '',
	refreshing: false
}
let img = [];

storeItems = (payload, prevImg) => {
	img = [];
	prevImg.map((item, index) => {
		img.push({ index: index, url: item.url });
	});
	let imgLength = img.length;
	payload.map((item, index) => {
		img.push({ index: imgLength+index, url: item.node.image.uri });
	});
}

export default ( state = INITIAL_STATE, action ) => {
	switch(action.type) {
		case SAVE_ALBUM_NAME:
			return { ...state, albumName: action.payload };
		case REMOVE_PREV_ALBUM_NAME:
			return { ...state, prevAlbumName: '' };
		case STORE_ALBUM_PHOTOS:
			storeItems(action.payload.edges, action.images);
			return { 
				...state, 
				prevAlbumName: action.prevAlbumName,
				dataSource: [ ...action.prevDataSource , ...action.payload.edges ],
				images: img,
				photosAfter: action.payload.page_info.end_cursor,
				has_next_page: action.payload.page_info.has_next_page,
				refreshing: false
			};
		case ALBUM_PHOTO_SCREEN_INITIAL_STATE:
			return { ...state,
				dataSource: [],
				images: [],
				photosAfter: null,
				has_next_page: true,
				prevAlbumName: '',
				refreshing: true 
			};
		default:
			return state;
	}
}
