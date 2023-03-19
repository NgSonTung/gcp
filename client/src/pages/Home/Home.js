import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import CustomerNavTitle from './CustomerNavTitle/CustomerNavTitle';
import TextTitle from './HomeTextTitle/HomeTextTitle';
import HomeProductBestSale from './HomeProductBestSale/index';
import SliderBanner from './SliderBanner/index';
import TabProductCate from '~/components/TabProductsCate/TabProductCate';
import { useState, useEffect } from 'react';
import * as ProductFetch from '~/functions/ProductFetch';
import * as CartFetch from '~/functions/CartFetch';
import { useDispatch, useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function Home() {
    const [products, setProducts] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        fectchingProducts();
        getDataOfCart();
    }, []);

    // const fectchingProducts = async () => {
    //     const fectchedData = await fetch('http://localhost:3001/api/v1/product/');
    //     const result = await fectchedData.json();
    //     console.log(result);
    //     setProducts(result.data.products);
    // };
    const fectchingProducts = async () => {
        const url = 'http://localhost:3001/api/v1/product/';
        let result = await ProductFetch.getAllProducts(url);
        setProducts(result.data.products);
        console.log(result.data.products);
        if (result) {
            const action = {
                type: 'GET_PRODUCT_FROM_DB',
                payload: result.data.products,
            };
            dispatch(action);
        }
    };

    const getDataOfCart = async () => {
        const url = 'http://localhost:3001/api/v1/checkout';
        let result = await CartFetch.getProductInCart(url);
        if (result) {
            const action = {
                type: 'LOAD_DEFAULT_CART_FROM_DB',
                payload: result.result,
            };
            dispatch(action);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <SliderBanner />
            <CustomerNavTitle />
            <TextTitle />
            <TabProductCate />
            <HomeProductBestSale cate={'phone'} srcImgBanner={require('~/assets/images/anh-sale-tet.png')} />
            <HomeProductBestSale cate={'laptop'} srcImgBanner={require('~/assets/images/phu-kien-hot.png')} />
            {products?.map((item, index) => (
                <p key={index}>{item.name}</p>
            ))}
        </div>
    );
}

export default Home;
