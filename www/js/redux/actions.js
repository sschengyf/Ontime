import * as actionTypes from './actionTypes';

const changeTime = (timeChangedOffset) => ({
	type: actionTypes.CHANGE_TIME,
	timeChangedOffset: timeChangedOffset
});

export {changeTime};