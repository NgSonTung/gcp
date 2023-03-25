import accounts from '~/data/users';
import jwt from 'jwt-decode';
const initialState = {
    isLoggedIn: false,
    isAdmin: false,
    userID: -1,
};

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            // console.log('LOGOUT');
            const { userName, password, token } = action.payload;
            const user = jwt(token.token);
            state.jwt = token.token;
            const isAuthenticated = accounts.some((account) => {
                return account.userName === userName && account.password === password;
            });
            return {
                ...state,
                isLoggedIn: isAuthenticated,
                isAdmin: isAuthenticated ? accounts.find((account) => account.userName === userName).auth === 1 : false,
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
