import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import CustomerNavTitle from './CustomerNavTitle/CustomerNavTitle';
import TextTitle from './HomeTextTitle/HomeTextTitle';
import HomeProductBestSale from './HomeProductBestSale/index';
import SliderBanner from './SliderBanner/index';
import TabProductCate from '~/components/TabProductsCate/TabProductCate';
import { useState, useEffect } from 'react';
const cx = classNames.bind(styles);

function Home() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fectchingProducts();
    });

    const fectchingProducts = async () => {
        const fectchedData = await fetch('http://localhost:3000/');
        const result = await fectchedData.json();
        console.log(result);
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
