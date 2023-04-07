import axios from 'axios';
export const getFeatureByProductID = (productID) => {
    return axios
        .get(`http://localhost:3001/api/v1/feature/byProduct/${productID}`)
        .then((res) => {
            return res.data.data.features;
        })
        .catch((err) => {
            return false;
        });
};

export const addFeature = (feature, jwt) => {
    // console.log(jwt);
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    return axios
        .post(`http://localhost:3001/api/v1/feature/`, feature, {
            headers: headers,
        })
        .then((res) => {
            return res.data.msg;
        })
        .catch((err) => {
            return err.response.data.msg;
        });
};

export const deleteFeatureById = (id, jwt) => {
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    return axios
        .delete(`http://localhost:3001/api/v1/feature/${id}`, {
            headers: headers,
        })
        .then((res) => {
            return res.data.msg;
        })
        .catch((err) => {
            return err.response.data.msg;
        });
};

export const updateFeatureById = (id, feature, jwt) => {
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    return axios
        .patch(`http://localhost:3001/api/v1/feature/${id}`, feature, {
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
