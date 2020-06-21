import { combineReducers } from 'redux';
import token from './token';
import product from './product';
import notifications from './notifications';

export default combineReducers({
	token,
	product,
	notifications,
});
