import ProductSlider from '~/components/ProductSlider/ProductSlider';
import productData from '~/data/data.json';

const productDataList = productData.filter((item) => {
    return item.favorite === true; //demo = favorite
});

const NewProductSlider = () => {
    return <ProductSlider data={productDataList} />;
};

export default NewProductSlider;
