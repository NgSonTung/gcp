import * as CartFetch from '~/functions/CartFetch';
const initialState = {
    cartItem: [],
    total: 0,
};

const CartReducer = (state = initialState, action) => {
    const product = action.payload;
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
            const productExists = state.cartItem.some((p) => p.productID === product.productID);
            // console.log(' ADD_TO_CART', product);
            if (!productExists) {
                console.log('not productExists');

                product.amount = 1;
                const newCart = [...state.cartItem, product];
                const totalPrice = newCart.reduce((total, product) => total + product.price * product.amount, 0);
                if (!product.cartID) {
                    product.cartID = 2;
                    //tam thoi tai chua co phan quyen
                    //--> neu dung la neu user khong login thi k gui data cart len db
                    console.log(product);
                    insertInCart(action.url, product);
                } else {
                    insertInCart(action.url, product);
                }
                return {
                    ...state,
                    cartItem: [...newCart],
                    total: totalPrice,
                };
            } else {
                console.log('productExists');
                const newCart = state.cartItem;
                const Index = newCart.findIndex((p) => p.productID === product.productID);
                if (newCart[Index].amount === undefined) {
                    newCart[Index].amount = 1;
                } else {
                    newCart[Index].amount += 1;
                }
                const productChange = newCart[Index];
                updateInCart(action.url, productChange);
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
            if (product === 'logout') {
                return {
                    ...state,
                    cartItem: [],
                };
            }
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
