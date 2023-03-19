import axios from 'axios';

export const getAllProducts = (url) => {
    if (url === '') {
        url = 'http://localhost:3001/?';
    }
    return axios
        .get(url)
        .then((res) => {
            // console.log(url);
            // console.log(res.data);
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

export const deleteProductById = (id) => {
    return axios
        .delete(id)
        .then((res) => {
            return res.data.msg;
        })
        .catch((err) => {
            return err.response.data.msg;
        });
};

export const addProduct = (product) => {
    return axios
        .post('/', product)
        .then((res) => {
            return res.data.msg;
        })
        .catch((err) => {
            return err.response.data.msg;
        });
};

export const updateProductById = (id, product) => {
    console.log(product);
    return axios
        .patch(id, product)
        .then((res) => {
            // console.log(res.status);
            return res.data.msg;
        })
        .catch((err) => {
            // console.log(err.response.status);
            return err.response.data.msg;
        });
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
export const insertProductToCart = (url, cart_product) => {
    if (url === '') {
        url = 'http://localhost:3001/';
    }
    return axios.post(url, cart_product).then((res) => {
        console.log(res);
    });
};
