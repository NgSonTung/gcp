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
        default:
            return {
                state,
            };
    }
};

export default ProductReducer;
