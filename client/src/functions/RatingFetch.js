import axios from 'axios';

export const getRatingByProductId = (id) => {
    return axios
        .get(`rating/byProduct/${id}}`)
        .then((res) => {
            // console.log(url);
            console.log(res.data);
            return res.data;
        })
        .catch((err) => console.log(err));
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