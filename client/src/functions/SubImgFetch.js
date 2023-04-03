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

export const postUrlFileImage = (blob, folderImage, imageName, productID, alt) => {
    const infor = { blob: blob, folderImage: folderImage, imageName: imageName, productID: productID, alt: alt };
    return axios
        .post(`/subimg/saveFileImage/`, infor)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return false;
        });
};
