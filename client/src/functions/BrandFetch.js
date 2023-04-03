import axios from 'axios';

export const getAllBrands = () => {
    return axios
        .get('http://localhost:3001/api/v1/brand')
        .then((res) => {
            // console.log(url);
            // console.log(res.data);
            return res.data;
        })
        .catch((err) => console.log(err));
};

export const getBrandById = (id) => {
    return axios
        .get(`brand/${id}`)
        .then((res) => {
            return res.data;
        })
        .catch((err) => console.log(err));
};
