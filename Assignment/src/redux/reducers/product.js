const initState = {
    title: '',
    urlKey: '',
    data: [],
};
const product = (state = initState, action) => {
    switch (action.type) {
        case 'SET_PRODUCT':
            return action.product;
        default:
            return state;
    }
};

export default product;
