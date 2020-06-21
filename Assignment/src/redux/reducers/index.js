import { combineReducers } from 'redux';
import notifications from './notifications';
import product from './product';
import token from './token';

export default combineReducers({
	token,
	product,
	notifications,
});
