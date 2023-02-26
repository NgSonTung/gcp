import ProductSlider from '~/components/ProductSlider/ProductSlider';
import productData from '~/data/data.json';

const productDataList = productData.filter((item) => {
    return item.brand === 'samsung'; //demo = favorite
});

const OnSaleProductsSlider = () => {
    return <ProductSlider data={productDataList} />;
};

export default OnSaleProductsSlider;
