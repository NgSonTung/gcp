import data from '~/data/data.json';

const initialState = {
    product: {},
};

const ProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'PRODUCT':
            return {
                product: data.find((item) => item.name === action.nameproduct),
            };
        case 'GET_PRODUCT_FROM_DB': {
            const products = action.payload;
            return {
                ...state,
                product: [...products],
            };
        }
        default:
            return state;
    }
};

export default ProductReducer;
