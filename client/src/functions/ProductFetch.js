import axios from 'axios';

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
            console.log(err.response);
            return err.response.data.msg;
        });
};
