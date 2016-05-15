import * as actionTypes from './actionTypes';

export function timeChanger(timeChangedOffset = 0, action) {
	switch(action.type) {
		case actionTypes.CHANGE_TIME:
			return action.timeChangedOffset;
		break;
		default:
			return timeChangedOffset;
	}
};