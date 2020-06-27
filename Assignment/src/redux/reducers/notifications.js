const initState = {
    data: [],
    totalUnread: 0,
};
const product = (state = initState, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATIONS':
            return action.notifications;
        default:
            return state;
    }
};

export default product;
