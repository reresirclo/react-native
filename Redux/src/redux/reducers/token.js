const initState = {
	token: null,
};

const token = (state = initState, action) => {
	switch (action.type) {
		case 'SET_TOKEN':
			return action.token;
		default:
			return state;
	}
};

export default token;
