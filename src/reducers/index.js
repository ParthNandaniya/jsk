import { combineReducers } from 'redux';

// RECENT SCREEN REDUCER
import recentReducer from './recentScreenReducer';
import imageReducer from './recentScreenImageReducer';

// ALBUM SCREEN REDUCER
import albumReducer from './albumScreenReducer';
import albumPhotoReducer from './albumPhotoScreenReducer';
import albumPhotoImageReducer from './albumPhotoScreenImageReducer';

// FAVORITE SCREEN REDCER
import favoriteReducer from './favoriteScreenReducer';
import favoriteImageReducer from './favoriteScreenImageReducer';

// VIDEO SCREEN REDUCER
import videoReducer from './videoScreenReducer';
import videoGridReducer from './videoGridScreenReducer';
import videoPlayReducer from './videoPlayScreenReducer';

// GLOBLE REDUCER
import globleReducer from './globleReducer';

export default combineReducers({
	recentReducer,
	imageReducer,
	albumReducer,
	albumPhotoReducer,
	albumPhotoImageReducer,
	videoReducer,
	videoGridReducer,
	videoPlayReducer,
	globleReducer,
	favoriteReducer,
	favoriteImageReducer
});
