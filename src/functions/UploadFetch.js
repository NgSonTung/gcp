import axios from 'axios';
export const postUrlFileImage = (jwt, blob, folderImage, imageName, productID, alt) => {
    const infor = {
        blob: blob,
        folderImage: folderImage,
        imageName: imageName,
        productID: productID,
        alt: alt,
    };
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    let urlAPI;
    if (folderImage === 'productImages') {
        urlAPI = 'http://localhost:3001/api/v1/product/image';
    } else if (folderImage === 'subImgimages') {
        urlAPI = 'http://localhost:3001/api/v1/subimg/image';
    }
    console.log(infor);
    return axios
        .post(`${urlAPI}`, infor, {
            headers: headers,
        })
        .then((res) => {
            console.log(res);
            return res.data.message;
        })
        .catch((err) => {
            return err.response.data.message;
        });
};
