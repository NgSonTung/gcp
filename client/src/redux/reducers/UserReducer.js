import * as UserFetch from '~/functions/UserFetch';
import jwt from 'jwt-decode';
const initialState = {
    isLoggedIn: null,
    isAdmin: null,
    userID: -1,
};

const UserReducer = (state = initialState, action) => {
    const userSign = async (user) => {
        await UserFetch.addUser('', user)
            .then((user) => {
                return user;
            })
            .catch((err) => {
                console.log(err);
            });
    };
    switch (action.type) {
        case 'LOGIN':
            // console.log('LOGOUT');
            const { token } = action.payload;
            console.log(token.token);
            if (token === false) {
                return {
                    ...state,
                    isLoggedIn: false,
                    isAdmin: false,
                    userID: -2,
                    cartID: -1,
                };
            }
            const user = jwt(token.token);
            console.log(user);
            state.jwt = token.token;
            return {
                ...state,
                isLoggedIn: true,
                isAdmin: token.auth === 1 ? true : false,
                userID: user.userID,
                cartID: user.cartID,
            };
        case 'LOGOUT':
            console.log('LOGOUT');
            console.log(state);
            return {
                ...state,
                isLoggedIn: action.payload.isLoggedIn,
                userID: -2,
                cartID: -1,
            };

        case 'SIGNUP':
            try {
                userSign(action.payload).then((u) => {
                    console.log(u);
                });
                return {
                    ...state,
                };
            } catch (error) {
                return {
                    ...state,
                };
            }
        default:
            return state;
    }
};

export default UserReducer;
