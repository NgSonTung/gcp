import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CustomerNavTitle from './CustomerNavTitle/CustomerNavTitle';
import TextTitle from './HomeTextTitle/HomeTextTitle';
import HomeProductBestSale from './HomeProductBestSale/index';
import SliderBanner from './SliderBanner/index';
import TabProductCate from '~/components/TabProductsCate/TabProductCate';
import * as CartFetch from '~/functions/CartFetch';
import * as ProductFetch from '~/functions/Fetch';
const cx = classNames.bind(styles);

function Home() {
    const dispatch = useDispatch();

    useEffect(() => {
        getDataOfCart();
    }, []);

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
        </div>
    );
}

export default Home;
