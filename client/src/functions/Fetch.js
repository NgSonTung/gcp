import axios from 'axios';

export const getAllProducts = (url) => {
    if (url === '') {
        url = 'http://localhost:3001/?';
    }
    return axios
        .get(url)
        .then((res) => {
            console.log(url);
            console.log(res.data);
            return res.data;
        })
        .catch((err) => console.log(err));
};
export const getProductInCart = (url) => {
    if (url === '') {
        url = 'http://localhost:3001/';
    }
    return axios
        .get(url)
        .then((res) => {
            // console.log('res', res);
            // console.log('res.data.data', res.data.data);
            return res.data.data;
        })
        .catch((err) => console.log(err));
};
