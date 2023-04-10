import * as CartFetch from '~/functions/CartFetch';
const initialState = {
    cartItem: [],
    total: 0,
    cartID: -1,
};

const CartReducer = (state = initialState, action) => {
    const data = action.payload;
    // console.log('data reducer', action);
    const updateInCart = async (url, productUpdated) => {
        await CartFetch.updateProductInCart(url, productUpdated);
    };
    const deleteInCart = async (url) => {
        await CartFetch.deleteProductInCart(url);
    };
    const insertInCart = async (url, productInserted) => {
        await CartFetch.insertProductToCart(url, productInserted);
    };
    switch (action.type) {
        case 'ADD_TO_CART': {
            const productExists = state.cartItem.some((p) => p.productID === data.productID);
            console.log(' ADD_TO_CART', data);
            if (!productExists) {
                // console.log('not productExists');
                if (data.amount === undefined) {
                    data.amount = 1;
                }

                const newCart = [...state.cartItem, data];
                const totalPrice = newCart.reduce((total, product) => total + product.price * product.amount, 0);
                data.cartID = state.cartID;
                if (data.cartID && data.cartID > 0) {
                    insertInCart(action.url, data);
                }
                return {
                    ...state,
                    cartItem: [...newCart],
                    total: totalPrice,
                };
            } else {
                console.log('productExists', data);
                const newCart = state.cartItem;
                const Index = newCart.findIndex((p) => p.productID === data.productID);
                if (newCart[Index].amount === undefined) {
                    newCart[Index].amount = 1;
                } else {
                    newCart[Index].amount += data.amount;
                }
                const productChange = newCart[Index];
                data.cartID = state.cartID;
                if (data.cartID && data.cartID > 0) {
                    // console.log('productChange update ');
                    updateInCart(action.url, productChange);
                }
                const totalPrice = newCart.reduce((total, product) => total + product.price * product.amount, 0);
                return {
                    ...state,
                    cartItem: [...newCart],
                    total: totalPrice,
                };
            }
        }
        case 'DELETE_FROM_CART': {
            const newCart = state.cartItem;
            const index = newCart.findIndex((p) => p.productID === data.productID);
            let url = action.url;
            url += `/${newCart[index].productID}`;
            newCart.splice(index, 1);
            const totalPrice = newCart.reduce((total, product) => total + product.price * product.amount, 0);
            if (data.cartID && data.cartID > 0) {
                deleteInCart(url);
            }
            return {
                ...state,
                cartItem: [...newCart],
                total: totalPrice,
            };
        }
        case 'CHANGE_AMOUNT': {
            const newCart = state.cartItem.map((p) => {
                if (p.productID === data.productID) {
                    return { ...p, amount: data.amount };
                }
                return p;
            });
            const totalPrice = newCart.reduce((total, product) => total + product.price * product.amount, 0);
            const productChange = newCart.find((p) => p.productID === data.productID);
            data.cartID = state.cartID;
            if (data.cartID && data.cartID > 0) {
                updateInCart(action.url, productChange);
            }
            return {
                ...state,
                cartItem: [...newCart],
                total: totalPrice,
            };
        }
        case 'LOAD_DEFAULT_CART_FROM_DB': {
            if (data.userID < 0) {
                return {
                    ...state,
                    cartItem: [],
                };
            } else {
                // console.log(data);
                const newCart = [...data.product];
                const totalPrice = newCart.reduce((total, product) => total + product.price * product.amount, 0);
                return {
                    ...state,
                    cartItem: [...data.product],
                    cartID: data.cartID,
                    total: totalPrice,
                };
            }
        }
        default: {
            return state;
        }
    }
};
export default CartReducer;
