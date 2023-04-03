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
import { getRatingByProductId } from '~/functions/RatingFetch';
const cx = classNames.bind(styles);

function ProductDetail(type = 'default') {
    const [data, setData] = useState(null);

    const { nameproduct } = useParams();
    const handleGetData = async () => {
        const fetchProduct = await getProductByName(nameproduct);

        const url = `product/?page=1&pageSize=10&categoryID=${fetchProduct[0].category}`;
        const fetchProductCategory = await getAllProducts(url);
        console.log(fetchProduct);
        const fetchSubImg = await getSubImgByProduct(fetchProduct[0].productID);
        const fetchFeature = await getFeatureByProductID(fetchProduct[0].productID);
        const fetchRating = await getRatingByProductId(fetchProduct[0].productID);
        setData({
            productData: fetchProduct,
            subImg: fetchSubImg,
            feature: fetchFeature,
            rating: fetchRating.data.rating,
            sameCategory: fetchProductCategory,
        });
    };
    console.log(data);
    useEffect(() => {
        handleGetData();
    }, []);

    const navItems = [
        // {
        //     title: 'sản phẩm cùng loại',
        //     component: <ProductBestSale data={similarItems} title={product?.category} srcImg={''} banner={false} />,
        // },
        {
            title: 'điểm nổi bật',
            component: (
                <div className={cx('product-desc-wrapper')}>
                    {data && <p className={cx('product-desc')}>{data?.productData[0]?.description}</p>}{' '}
                </div>
            ),
        },
    ];

    // const similarItems = data.filter((item) => item.category === product?.category);
    // const favItems = data.filter((item) => item.favorite === true);

    // const defaultNavItems = [
    //     {
    //         title: 'yêu thích',
    //         component: <ProductBestSale data={favItems} title={product?.category} srcImg={''} banner={false} />,
    //     },
    // ];

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
                                rating={data?.rating}
                            />
                        </div>
                    </div>
                    <NavTitle className={cx('product-nav')} navItems={navItems} />
                    {/* <NavTitle className={cx('product-nav')} navItems={defaultNavItems} /> */}
                </div>
            )}
        </div>
    );
}

export default ProductDetail;
