import axios from 'axios';

export const getRatingByProductId = (id) => {
    return axios
        .get(`http://localhost:3001/api/v1/rating/byProduct/${id}`)
        .then((res) => {
            return res.data;
        })
        .catch((err) => console.log(err));
};

export const ratingProduct = (ratingInfo) => {
    return axios
        .post(`http://localhost:3001/api/v1/rating/add`, ratingInfo)
        .then((res) => {
            return res.data;
        })
        .catch((err) => console.log(err));
};
