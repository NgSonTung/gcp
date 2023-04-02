import axios from 'axios';

export const getAllCategories = () => {
    return axios
        .get('http://localhost:3001/api/v1/category')
        .then((res) => {
            return res.data;
        })
        .catch((err) => console.log(err));
};
