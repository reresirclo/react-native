import { combineReducers } from 'redux';
import token from './token';
import product from './product';

export default combineReducers({
	token,
	product,
});
