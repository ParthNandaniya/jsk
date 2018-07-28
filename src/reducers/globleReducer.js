import {
	COLOR_CHANGE,
	SAVE_OLD_COLOR,
	SAVE_DEFAULT_COLOR
} from '../actions/types';

const INITIAL_STATE = {
	color: '#7c5ea8',
	defaultColor: '#7c5ea8',
	oldColor: '#7c5ea8'
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case COLOR_CHANGE:
			return { ...state, color: action.payload.toString() };
		case SAVE_OLD_COLOR:
			return { ...state, oldColor: action.payload.toString() };
		case SAVE_DEFAULT_COLOR:
			return { ...state, 
				color: action.payload.toString(),
				defaultColor: action.payload.toString(),
				oldColor: action.payload.toString()
			};
		default:
			return state;
	}
};
