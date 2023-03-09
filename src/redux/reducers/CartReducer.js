const initialState = {
    cartItem: [],
};

const CartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            return state;
        }
        case 'DELETE_FROM_CART': {
            return state;
        }
        case 'INCREASE_QTY': {
            return state;
        }
        case 'DECREASE_QTY': {
            return state;
        }
        default: {
            return state;
        }
    }
};
export default CartReducer;
