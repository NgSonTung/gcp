import axios from 'axios';
export const getFeatureByProductID = (productID) => {
    console.log(productID);
    return axios
        .get(`/feature/byProduct/${productID}`)
        .then((res) => {
            return res.data.data.features;
        })
        .catch((err) => {
            return false;
        });
};
