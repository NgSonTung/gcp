import axios from 'axios';
// import { useDispatch } from 'react-redux';

// const dispatch = useDispatch();

export const getAllProducts = (url) => {
    if (url === '') {
        url = 'product/?page=1&pageSize=10';
    }
    return axios
        .get(`${url}`)
        .then((res) => {
            return res.data;
        })
        .catch((err) => console.log(err));
};

export const getProductByName = (name) => {
    // console.log(name);
    return axios
        .get(`http://localhost:3001/api/v1/product/?page=1&pageSize=1`, { params: { name: name } })
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
        .delete(`http://localhost:3001/api/v1/product/${id}`, {
            headers: headers,
        })
        .then((res) => {
            return res.data.msg;
        })
        .catch((err) => {
            return err.response.data.msg;
        });
};

export const deleteMultipleProductsById = (ids, jwt) => {
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    return axios
        .delete(`http://localhost:3001/api/v1/product/`, { params: { id: ids }, headers: headers })
        .then((res) => {
            return res.data.msg;
        })
        .catch((err) => {
            return err.response.data.msg;
        });
};

export const addProduct = (product, jwt) => {
    // console.log(jwt);
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    return axios
        .post(`http://localhost:3001/api/v1/product/`, product, {
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
        .patch(`http://localhost:3001/api/v1/product/${id}`, product, {
            headers: headers,
        })
        .then((res) => {
            // console.log(res.status);
            return res.data.msg;
        })
        .catch((err) => {
            // console.log(err.response);
            return err.response.data.msg;
        });
};

export const getURLProductImage = async (listImage, type = 'default') => {
    let listImageSrc = [];
    for (let element of listImage) {
        const response = await getFileProductImage(element);
        const blob = new Blob([response.data], { type: 'image/jpg' });
        const blobUrl = URL.createObjectURL(blob);
        listImageSrc.push(blobUrl);
    }
    if (type === 'admin')
        listImageSrc.push(
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRal66RNJGRaNvsBcwWGY8S9rZO5UPXXpAEwg&usqp=CAU',
        );

    return listImageSrc;
};

export const getFileProductImage = (imageName) => {
    return axios
        .get(`http://localhost:3001/api/v1/product/image/${imageName}`, { responseType: 'blob' })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return false;
        });
};
