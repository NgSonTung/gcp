import axios from 'axios';
export const getSubImgByProduct = (productID) => {
    return axios
        .get(`/subimg/byProduct/${productID}`)
        .then((res) => {
            return res.data.data.subimgs;
        })
        .catch((err) => {
            return false;
        });
};

export const getFileImage = (imageName) => {
    return axios
        .get(`/subimg/getFileImage/${imageName}`, { responseType: 'blob' })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return false;
        });
};

export const postUrlFileImage = (infor) => {
    // infor.url,
    // infor.folderImage,
    // infor.imageName,
    // infor.createAt
    return axios
        .post(`/subimg/saveFileImage/`, infor)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return false;
        });
};
