import axios from 'axios';
export const getSubImgByProduct = (productID) => {
    console.log(productID);
    return axios.get(`/subimg/byProduct/${productID}`).then((res) => {
        return res.data.data.subimgs
    })
    .catch((err)=>{
        return false
    })
    ;
};
