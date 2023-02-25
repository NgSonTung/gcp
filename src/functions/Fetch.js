import axios from 'axios';

export const getAllProducts = (url) => {
    return axios
        .get(url)
        .then((res) => {
            return res.data;
        })
        .catch((err) => console.log(err));
};
