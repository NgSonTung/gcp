import axios from 'axios';
export const getSubImgByProduct = (productID) => {
    return axios
        .get(`http://localhost:3001/api/v1/subimg/byProduct/${productID}`)
        .then((res) => {
            return res.data.data.subimgs;
        })
        .catch((err) => {
            return false;
        });
};

export const getURLImage = async (listImage, type = 'default') => {
    let listImageSrc = [];
    for (let element of listImage) {
        const response = await getFileImage(element);
        const blob = new Blob([response.data], { type: 'image/jpg' });
        const blobUrl = URL.createObjectURL(blob);
        listImageSrc.push(blobUrl);
    }
    if (type === 'admin')
        listImageSrc.push(
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRal66RNJGRaNvsBcwWGY8S9rZO5UPXXpAEwg&usqp=CAU',
        );

    return listImageSrc;
};
export const getFileImage = (imageName) => {
    return axios
        .get(`http://localhost:3001/api/v1/subimg/getFileImage/${imageName}`, { responseType: 'blob' })
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
