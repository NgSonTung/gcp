import axios from 'axios';
export const postUrlFileImage = (blob, folderImage, imageName, productID, alt) => {
    const infor = {
        blob: blob,
        folderImage: folderImage,
        imageName: imageName,
        productID: productID,
        alt: alt,
    };
    let urlAPI;
    // if (folderImage === 'productImages') {
    //     urlAPI = 'http://localhost:3001/api/v1/product/saveFileImage/';
    // } else if (folderImage === 'subImgimages') {
    //     urlAPI = 'http://localhost:3001/api/v1/subimg/saveFileImage/';
    // }
    urlAPI = 'http://localhost:3001/api/v1/upload/save';
    return axios
        .post(`${urlAPI}`, infor)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return false;
        });
};

export const check = (folderImage, imageName) => {
    const infor = { folderImage: folderImage, imageName: imageName };
    let urlAPI;
    urlAPI = 'http://localhost:3001/api/v1/upload/check';

    return axios
        .post(`${urlAPI}`, infor)
        .then((res) => {
            console.log(res);
            return res;
        })
        .catch((err) => {
            return false;
        });
};
