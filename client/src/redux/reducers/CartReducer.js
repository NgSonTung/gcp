const initialState = {
    cartItem: [],
    total: 0,
};

const CartReducer = (state = initialState, action) => {
    const product = action.payload;
    switch (action.type) {
        case 'ADD_TO_CART': {
            const productExists = state.cartItem.some((p) => p.id === product.id);
            if (!productExists) {
                product.qty = 1;
                return {
                    ...state,
                    cartItem: [...state.cartItem, product],
                    total: product.price,
                };
            } else {
                const newCart = state.cartItem;
                const Index = newCart.findIndex((p) => p.id === product.id);
                if (newCart[Index].qty === undefined) {
                    newCart[Index].qty = 1;
                } else {
                    newCart[Index].qty += 1;
                }
                const totalPrice = newCart.reduce((total, product) => total + product.price * product.qty, 0);
                return {
                    cartItem: [...newCart],
                    total: totalPrice,
                };
            }
        }
        case 'DELETE_FROM_CART': {
            const newCart = state.cartItem;
            const index = newCart.findIndex((p) => p.id === product.id);
            newCart.splice(index, 1);
            const totalPrice = newCart.reduce((total, product) => total + product.price * product.qty, 0);

            return {
                ...state,
                cartItem: [...newCart],
                total: totalPrice,
            };
        }
        case 'CHANGE_QTY': {
            const newCart = state.cartItem;
            const index = newCart.findIndex((p) => p.id === product.id);
            newCart[index].qty = product.qty;
            const totalPrice = newCart.reduce((total, product) => total + product.price * product.qty, 0);
            return {
                ...state,
                cartItem: [...newCart],
                total: totalPrice,
            };
        }
        default: {
            return { ...state };
        }
    }
};
export default CartReducer;
