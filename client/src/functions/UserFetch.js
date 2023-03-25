import axios from 'axios';

export const getUserIDByName = async (url = '', username) => {
    if (url === '') {
        url = 'http://localhost:3001/api/v1/user/username';
    }
    console.log(username);
    return axios.get(`${url}/${username}`).then((res) => {
        return res.data.data.user.userID;
    });
};
