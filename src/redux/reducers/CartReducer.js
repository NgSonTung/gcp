const initialState = {
    cartItem: [],
};

const CartReducer = (state = initialState, action) => {
    const product = action.payload;
    switch (action.type) {
        case 'ADD_TO_CART': {
            const productExists = state.cartItem.some((p) => p.id === product.id);
            console.log('state from reducer', productExists);
            if (!productExists) {
                return {
                    ...state,
                    cartItem: [...state.cartItem, product],
                };
            }
            console.log(state);
            return { ...state };
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
