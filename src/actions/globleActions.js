import {
	COLOR_CHANGE,
	SAVE_OLD_COLOR,
	SAVE_DEFAULT_COLOR
} from './types';

export const colorChange = (color) => {
	return ({ type: COLOR_CHANGE, payload: color });
};

export const saveOldColor = (color) => {
	return ({ type: SAVE_OLD_COLOR, payload: color });
};

export const saveDefaultColor = (color) => {
	return ({ type: SAVE_DEFAULT_COLOR, payload: color });
};
