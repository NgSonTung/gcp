import axios from 'axios';

export const getJWTOfLogin = (url = '', login) => {
    console.log(login);
    if (url === '') {
        url = 'http://localhost:3001/api/v1/user/login';
    }
    return axios
        .post(url, login)
        .then((res) => {
            return res.data.data;
        })
        .catch((err) => {
            return false;
        });
};

export const getAllUsers = (params, jwt) => {
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    return axios
        .get(`http://localhost:3001/api/v1/user/${params}`, { headers: headers })
        .then((res) => {
            return res.data;
        })
        .catch((err) => console.log(err));
};

export const getUserByUserName = (url = '', username) => {
    if (url === '') {
        url = `http://localhost:3001/api/v1/user/byname/${username}`;
    }
    // console.log(url);
    return axios
        .get(url)
        .then((res) => {
            return res.data.data;
        })
        .catch((err) => {
            return false;
        });
};

export const addUser = (url, user) => {
    if (url === '') {
        url = 'http://localhost:3001/api/v1/user/signup';
    }
    console.log(user);
    return axios
        .post(url, user)
        .then((res) => {
            console.log(res);
            return res.data.data;
        })
        .catch((err) => {
            return false;
        });
};

export const addUser2 = (user, jwt) => {
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    return axios
        .post(`http://localhost:3001/api/v1/user`, user, { headers: headers })
        .then((res) => {
            return res.data.msg;
        })
        .catch((err) => {
            return err.response.data.msg;
        });
};

export const deleteUserById = (id, jwt) => {
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    return axios
        .delete(`http://localhost:3001/api/v1/user/${id}`, {
            headers: headers,
        })
        .then((res) => {
            return res.data.msg;
        })
        .catch((err) => {
            return err.response.data.msg;
        });
};

export const deleteMultipleUsersById = (ids, jwt) => {
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    console.log(ids);
    return axios
        .delete(`http://localhost:3001/api/v1/user/`, { params: { id: ids }, headers: headers })
        .then((res) => {
            return res.data.msg;
        })
        .catch((err) => {
            return err.response.data.msg;
        });
};

export const updateUserById = (id, user, jwt) => {
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    console.log(id, user, 'jwt:', jwt);
    return axios
        .patch(`http://localhost:3001/api/v1/user/${id}`, user, {
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
