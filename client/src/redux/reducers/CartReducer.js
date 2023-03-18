import * as FetchFn from '~/functions/Fetch';
const initialState = {
    cartItem: [],
    total: 0,
};

const CartReducer = (state = initialState, action) => {
    const product = action.payload;
    const updateInCart = async (url, productUpdated) => {
        await FetchFn.updateProductInCart(url, productUpdated);
    };
    const deleteInCart = async (url) => {
        await FetchFn.deleteProductInCart(url);
    };
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
            const index = newCart.findIndex((p) => p.productID === product.productID);
            let url = action.url;
            url += `/${newCart[index].productID}`;
            newCart.splice(index, 1);
            const totalPrice = newCart.reduce((total, product) => total + product.price * product.amount, 0);
            deleteInCart(url);

            return {
                ...state,
                cartItem: [...newCart],
                total: totalPrice,
            };
        }
        case 'CHANGE_AMOUNT': {
            const newCart = state.cartItem.map((p) => {
                if (p.productID === product.productID) {
                    return { ...p, amount: product.amount };
                }
                return p;
            });
            const totalPrice = newCart.reduce((total, product) => total + product.price * product.amount, 0);
            const productChange = newCart.find((p) => p.productID === product.productID);
            updateInCart(action.url, productChange);
            return {
                ...state,
                cartItem: [...newCart],
                total: totalPrice,
            };
        }
        case 'LOAD_DEFAULT_CART_FROM_DB': {
            const newCart = [...product];
            const totalPrice = newCart.reduce((total, product) => total + product.price * product.amount, 0);
            return {
                ...state,
                cartItem: [...product],
                total: totalPrice,
            };
        }
        default: {
            return state;
        }
    }
};
export default CartReducer;
