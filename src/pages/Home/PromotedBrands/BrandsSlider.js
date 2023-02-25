import ProductSlider from '~/components/ProductSlider/ProductSlider';
import productData from '~/data/data.json';

const productDataList = productData.filter((item) => {
    return item.favorite === true; //demo = favorite
});

const BrandsSlider = () => {
    return <ProductSlider data={productDataList} />;
};

export default BrandsSlider;
