import accounts from '~/data/users';
const initialState = {
    isLoggedIn: false,
    isAdmin: false,
};

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            state.isLoggedIn = null;
            const { userName, password } = action.payload;
            let isCorrect = false;
            let auth;
            accounts.forEach((account) => {
                if (userName === account.userName && password === account.password) {
                    isCorrect = true;
                    auth = account.auth;
                }
            });
            return {
                ...state,
                isLoggedIn: isCorrect,
                isAdmin: auth === 1 ? true : false,
            };
        case 'LOGOUT':
            return {
                ...state,
                isLoggedIn: false,
            };
        default:
            return {
                ...state,
            };
    }
};

export default UserReducer;
