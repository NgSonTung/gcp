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
                product.amount = 1;
                return {
                    ...state,
                    cartItem: [...state.cartItem, product],
                    total: product.price,
                };
            } else {
                const newCart = state.cartItem;
                const Index = newCart.findIndex((p) => p.id === product.id);
                if (newCart[Index].amount === undefined) {
                    newCart[Index].amount = 1;
                } else {
                    newCart[Index].amount += 1;
                }
                const totalPrice = newCart.reduce((total, product) => total + product.price * product.amount, 0);
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
            const totalPrice = newCart.reduce((total, product) => total + product.price * product.amount, 0);

            return {
                ...state,
                cartItem: [...newCart],
                total: totalPrice,
            };
        }
        case 'CHANGE_AMOUNT': {
            const newCart = state.cartItem;
            const index = newCart.findIndex((p) => p.id === product.id);
            newCart[index].amount = product.amount;
            const totalPrice = newCart.reduce((total, product) => total + product.price * product.amount, 0);
            return {
                ...state,
                cartItem: [...newCart],
                total: totalPrice,
            };
        }
        case 'LOAD_DEFAULT_CART_FROM_DB': {
            const newCart = [...product];
            console.log('newCart', newCart);
            const totalPrice = newCart.reduce((total, product) => total + product.price * product.amount, 0);
            return {
                ...state,
                cartItem: [...product],
                total: totalPrice,
            };
        }
        default: {
            return { ...state };
        }
    }
};
export default CartReducer;
