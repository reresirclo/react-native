const token = (state = "", action) => {
	switch (action.type) {
		case 'SET_NAVIGATION':
			return action.navigation;
		default:
			return state;
	}
};

export default token;
