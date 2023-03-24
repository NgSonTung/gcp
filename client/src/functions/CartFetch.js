import axios from 'axios';

export const getProductInCart = (url) => {
    if (url === '') {
        url = 'http://localhost:3001/api/v1/checkout/';
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

export const updateProductInCart = (url, cart_product) => {
    if (url === '') {
        url = 'http://localhost:3001/';
    }
    return axios.patch(url, cart_product).then((res) => {
        console.log(res);
    });
};

export const deleteProductInCart = (url) => {
    if (url === '') {
        url = 'http://localhost:3001/';
    }
    return axios.delete(url).then((res) => {
        console.log(res);
    });
};

export const insertProductToCart = (url = '', cart_product) => {
    if (url === '') {
        url = 'http://localhost:3001/api/v1/checkout/';
    }
    return axios.post(url, cart_product).then((res) => {
        console.log(res);
    });
};