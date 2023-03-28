import accounts from '~/data/users';
import jwt from 'jwt-decode';
const initialState = {
    isLoggedIn: null,
    isAdmin: false,
    userID: -1,
};

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            // console.log('LOGOUT');
            const { userName, password, token } = action.payload;
            if (token === false) {
                console.log('token is false', token);
                return {
                    ...state,
                    isLoggedIn: false,
                    isAdmin: false,
                    userID: -2,
                };
            }
            const user = jwt(token.token);
            state.jwt = token.token;

            return {
                ...state,
                isLoggedIn: true,
                isAdmin: token.auth === 1 ? true : false,
                userID: user.userID,
            };
        case 'LOGOUT':
            console.log('LOGOUT');
            return {
                ...state,
                isLoggedIn: false,
                userID: -1,
            };
        default:
            return state;
    }
};

export default UserReducer;
