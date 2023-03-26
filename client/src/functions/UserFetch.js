import axios from 'axios';

export const getJWTOfLogin = (url = '', login) => {
    if (url === '') {
        url = 'http://localhost:3001/api/v1/user/login';
    }
    return axios
        .post(url, login)
        .then((res) => {
            console.log(res);
            return res.data.data;
        })
        .catch((err) => {
            return false;
        });
};
