import classNames from 'classnames/bind';
import styles from './ProductDetail.module.scss';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import React from 'react';
import ProductMagnifier from '../ProductMagnifier';
import ProductDetailDesc from '../ProductDetailDesc';
import NavTitle from '../NavTitle';
import ProductBestSale from '../ProductBestSale/';
import data from '~/data/data.json';
import { getProductByName } from '~/functions/ProductFetch';

const cx = classNames.bind(styles);

function ProductDetail() {
    const [productData, setProductData] = useState([]);
    const [totalProduct, setTotalProduct] = useState(0);
    const { nameproduct } = useParams();

    const handleGetData = async () => {
        const fetchProduct = await getProductByName(nameproduct);
        setProductData(fetchProduct);
        // setTotalProduct(fetchedData?.data?.products?.totalProduct);
    };
    useEffect(() => {
        handleGetData();
    }, []);

    // const similarItems = data.filter((item) => item.category === product?.category);
    // const favItems = data.filter((item) => item.favorite === true);

    // const navItems = [
    //     {
    //         title: 'sản phẩm cùng loại',
    //         component: <ProductBestSale data={similarItems} title={product?.category} srcImg={''} banner={false} />,
    //     },
    //     {
    //         title: 'điểm nổi bật',
    //         component: (
    //             <div className={cx('product-desc-wrapper')}>
    //                 <p className={cx('product-desc')}>{product?.description}</p>
    //             </div>
    //         ),
    //     },
    // ];

    // const defaultNavItems = [
    //     {
    //         title: 'yêu thích',
    //         component: <ProductBestSale data={favItems} title={product?.category} srcImg={''} banner={false} />,
    //     },
    // ];

    return (
        <div className={cx('product-detail-container')}>
            {productData && (
                <div>
                    <div className={cx('main-detail-wrapper')}>
                        <div className={cx('product-image')}>
                            <ProductMagnifier product={productData} />
                        </div>
                        <div className={cx('product-detail')}>
                            <ProductDetailDesc product={productData} />
                        </div>
                    </div>
                    {/* <NavTitle className={cx('product-nav')} navItems={navItems} />
                <NavTitle className={cx('product-nav')} navItems={defaultNavItems} /> */}
                </div>
            )}
        </div>
    );
}

export default ProductDetail;
