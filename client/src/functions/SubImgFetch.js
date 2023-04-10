import axios from 'axios';
export const getSubImgByProduct = (productID) => {
    return axios
        .get(`http://localhost:3001/api/v1/subimg/?productId=${productID}`)
        .then((res) => {
            return res.data.data.subimgs;
        })
        .catch((err) => {
            return false;
        });
};

export const getURLSubImage = async (listImage, type = 'default') => {
    let listImageSrc = [];
    for (let element of listImage) {
        console.log(element);
        const response = await getFileSubImage(element);
        const contentType = response.headers['content-type'];
        const blob = new Blob([response.data], { type: contentType });
        const blobUrl = URL.createObjectURL(blob);
        listImageSrc.push(blobUrl);
    }
    // if (type === 'admin')
    //     listImageSrc.push(
    //         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRal66RNJGRaNvsBcwWGY8S9rZO5UPXXpAEwg&usqp=CAU',
    //     );

    return listImageSrc;
};

export const getFileSubImage = (subImageId) => {
    return axios
        .get(`http://localhost:3001/api/v1/subimg/image/${subImageId}`, { responseType: 'arraybuffer' })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return false;
        });
};

export const deleteFileSubImage = (subImageId) => {
    return axios
        .delete(`http://localhost:3001/api/v1/subimg/image/${subImageId}`)
        .then((res) => {
            console.log(res);
            return res.data.msg;
        })
        .catch((err) => {
            return err.data.msg;
        });
};
