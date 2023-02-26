import ProductSlider from '~/components/ProductSlider/ProductSlider';
import productData from '~/data/data.json';

const productDataList = productData.filter((item) => {
    return item.brand === 'apple'; //demo = favorite
});

const SpecialProductSlider = () => {
    return <ProductSlider data={productDataList} />;
};

export default SpecialProductSlider;
