import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import CustomerNavTitle from './CustomerNavTitle/CustomerNavTitle';
import TextTitle from './HomeTextTitle/HomeTextTitle';
import HomeProductBestSale from './HomeProductBestSale/index';
import SliderBanner from './SliderBanner/index';
import TabProductCate from '~/components/TabProductsCate/TabProductCate';
import { useState, useEffect } from 'react';
import { getProductInCart } from '~/functions/Fetch';
import { useDispatch, useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function Home() {
    const [products, setProducts] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        fectchingProducts();
        getDataOfCart();
        // console.log(products);
    }, []);

    const fectchingProducts = async () => {
        const fectchedData = await fetch('http://localhost:3001/');
        const result = await fectchedData.json();
        setProducts(result.data.products);
        // console.log(result);
    };
    const getDataOfCart = async () => {
        const url = 'http://localhost:3001/api/v1/checkout';
        let result = await getProductInCart(url);
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
