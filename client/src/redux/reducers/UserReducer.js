import accounts from '~/data/users';
const initialState = {
    isLoggedIn: false,
    isAdmin: false,
};

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            console.log('LOGOUT');
            const { userName, password } = action.payload;
            const isAuthenticated = accounts.some((account) => {
                return account.userName === userName && account.password === password;
            });
            return {
                ...state,
                isLoggedIn: isAuthenticated,
                isAdmin: isAuthenticated ? accounts.find((account) => account.userName === userName).auth === 1 : false,
            };
        case 'LOGOUT':
            console.log('LOGOUT');
            return {
                ...state,
                isLoggedIn: false,
            };
        default:
            return state;
    }
};

export default UserReducer;
