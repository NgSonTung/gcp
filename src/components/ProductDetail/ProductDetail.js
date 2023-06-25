import classNames from 'classnames/bind';
import styles from './ProductDetail.module.scss';
import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import React from 'react';
import ProductMagnifier from '../ProductMagnifier';
import ProductDetailDesc from '../ProductDetailDesc';
import NavTitle from '../NavTitle';
import ProductBestSale from '../ProductBestSale/';
// import data from '~/data/data.json';
import { getProductByName, getAllProducts } from '~/functions/ProductFetch';
import { getSubImgByProduct } from '~/functions/SubImgFetch';
import { getFeatureByProductID } from '~/functions/FeatureFetch';
import { getCategoryId } from '~/functions/CategoryFetch';
import { getAllBrands } from '~/functions/BrandFetch';
const cx = classNames.bind(styles);

function ProductDetail(type = 'default') {
    const [data, setData] = useState(null);
    const { nameproduct } = useParams();
    const handleGetData = async () => {
        const fetchProduct = await getProductByName(nameproduct);
        const [fetchSubImg, fetchFeature, fetchBrand] = await Promise.all([
            getSubImgByProduct(fetchProduct[0]?.productID),
            getFeatureByProductID(fetchProduct[0]?.productID),
            getAllBrands(),
        ]);
        // const fetchSubImg = await getSubImgByProduct(fetchProduct[0].productID);
        // const fetchFeature = await getFeatureByProductID(fetchProduct[0].productID);
        // const fetchBrand = await getAllBrands();
        const urlCate = `http://localhost:3001/api/v1/product/?page=1&pageSize=10&categoryID=${fetchProduct[0].categoryID}`;
        const fetchProductCategory = await getAllProducts(urlCate);
        const urlBrand = `http://localhost:3001/api/v1/product/?page=1&pageSize=10&brandID=${fetchProduct[0].brandID}`;
        const fetchProductBrand = await getAllProducts(urlBrand);

        return {
            productData: fetchProduct,
            subImg: fetchSubImg,
            feature: fetchFeature,
            similarItems: fetchProductCategory.data.products.dataProducts,
            brands: fetchBrand.data.brands,
            similarItemsByBrand: fetchProductBrand.data.products.dataProducts,
        };
    };
    const loadData = async () => {
        const data = await handleGetData();
        setData(data);
    };
    useEffect(() => {
        loadData();
        window.scrollTo(0, 0);
    }, [nameproduct]);
    const navItems = [
        {
            title: 'sản phẩm cùng loại',
            component: <ProductBestSale data={data?.similarItems} srcImg={''} banner={false} />,
        },
        {
            title: 'điểm nổi bật',
            component: (
                <div className={cx('product-desc-wrapper')}>
                    {data && <p className={cx('product-desc')}>{data?.productData[0]?.description}</p>}
                </div>
            ),
        },
    ];

    // const similarItems = data.filter((item) => item.category === product?.category);
    // const favItems = data.filter((item) => item.favorite === true);

    const defaultNavItems = [
        {
            title: 'sản phẩm cùng hãng',
            component: <ProductBestSale data={data?.similarItemsByBrand} srcImg={''} banner={false} />,
        },
    ];

    return (
        <div className={cx('product-detail-container')}>
            {data?.productData && (
                <div>
                    <div className={cx('main-detail-wrapper')}>
                        <div className={cx('product-image')}>
                            <ProductMagnifier product={data?.productData[0]} subImg={data?.subImg} />
                        </div>
                        <div className={cx('product-detail')}>
                            <ProductDetailDesc
                                product={data?.productData[0]}
                                feature={data?.feature}
                                brands={data?.brands}
                            />
                        </div>
                    </div>
                    <NavTitle className={cx('product-nav')} navItems={navItems} />
                    <NavTitle className={cx('product-nav')} navItems={defaultNavItems} />
                </div>
            )}
        </div>
    );
}

export default ProductDetail;
