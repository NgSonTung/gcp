import axios from 'axios';

export const getAllProducts = (url) => {
    if (url === '') {
        url = 'http://localhost:3001/api/v1/product/?page=1&pageSize=5';
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

export const getProductByName = (url, searchvalue) => {
    if (url === '') {
        url = `http://localhost:3001/api/v1/product/?page=1&pageSize=5&name=${searchvalue}`;
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

export const getAllProductsNonPage = (url) => {
    if (url === '') {
        url = 'http://localhost:3001/api/v1/product/productnonpagination?';
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

export const deleteProductById = (id) => {
    return axios
        .delete(`product/${id}`)
        .then((res) => {
            return res.data.msg;
        })
        .catch((err) => {
            return err.response.data.msg;
        });
};

export const addProduct = (product) => {
    return axios
        .post(`product/`, product)
        .then((res) => {
            return res.data.msg;
        })
        .catch((err) => {
            return err.response.data.msg;
        });
};

export const updateProductById = (id, product) => {
    return axios
        .patch(`product/${id}`, product)
        .then((res) => {
            // console.log(res.status);
            return res.data.msg;
        })
        .catch((err) => {
            // console.log(err.response.status);
            return err.response.data.msg;
        });
};

export const updateProductInCart = (url = '', cart_product) => {
    if (url === '') {
        url = 'http://localhost:3001/api/v1/checkout/';
    }
    return axios.patch(url, cart_product).then((res) => {
        console.log(res);
    });
};
export const deleteProductInCart = (url) => {
    if (url === '') {
        url = 'http://localhost:3001/api/v1/checkout/';
    }
    return axios.delete(url).then((res) => {
        console.log(res);
    });
};

export const getProductsByCateName = (name) => {
    const url = `http://localhost:3001/api/v1/product/?page=1&pageSize=20&categoryName=${name}`;
    return axios
        .get(url)
        .then((res) => {
            return res.data;
        })
        .catch((err) => console.log(err));
};
