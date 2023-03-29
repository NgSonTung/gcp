import axios from 'axios';
import { useDispatch } from 'react-redux';

// const dispatch = useDispatch();

export const getAllProducts = (url) => {
    if (url === '') {
        url = 'product/?page=1&pageSize=10';
    }
    return axios
        .get(url)
        .then((res) => {
            // console.log(url);
            console.log(res.data);
            return res.data;
        })
        .catch((err) => console.log(err));
};

export const getProductByName = (name) => {
    console.log(name);
    return axios
        .get(`/product/?page=1&pageSize=1`, { params: { name: name } })
        .then((res) => {
            return res.data.data.products.dataProducts;
        })
        .catch((err) => console.log(err));
};

export const deleteProductById = (id, jwt) => {
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    return axios
        .delete(`/product/${id}`, {
            headers: headers,
        })
        .then((res) => {
            return res.data.msg;
        })
        .catch((err) => {
            return err.response.data.msg;
        });
    // const product = {
    //     type: 'GET_PRODUCT_FROM_DB',
    //     payload:
    // };
    // dispatch(location);
};

export const addProduct = (product, jwt) => {
    // console.log(jwt);
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    return axios
        .post(`product/`, product, {
            headers: headers,
        })
        .then((res) => {
            return res.data.msg;
        })
        .catch((err) => {
            return err.response.data.msg;
        });
};

export const updateProductById = (id, product, jwt) => {
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    return axios
        .patch(`product/${id}`, product, {
            headers: headers,
        })
        .then((res) => {
            // console.log(res.status);
            return res.data.msg;
        })
        .catch((err) => {
            console.log(err.response);
            return err.response.data.msg;
        });
};
