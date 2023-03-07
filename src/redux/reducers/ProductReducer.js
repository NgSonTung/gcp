import data from '~/data/data.json';

const initialState = {
    product: {},
    loggedIn: false,
};

const ProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'PRODUCT':
            return {
                product: data.find((item) => item.name === action.nameproduct),
            };
        default:
            return {
                state,
            };
    }
};

const UserLogging = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                loggedIn: true,
            };
        case 'LOGOUT':
            return {
                loggedIn: false,
            };
        default:
            return {
                state,
            };
    }
};

export default ProductReducer;
