import classNames from 'classnames/bind';
import styles from './Home.module.scss';
// import CustomerSlider from './CustomerSlider/CustomerSlider';
import CustomerNavTitle from './CustomerNavTitle/CustomerNavTitle';
import TextTitle from './HomeTextTitle/HomeTextTitle';
import HomeProductBestSale from './BestSale/HomeProductBestSale/index';
const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrapper')}>
            <CustomerNavTitle />
            <TextTitle />
            <HomeProductBestSale cate={'phone'} srcImgBanner={require('~/assets/images/anh-sale-tet.png')} />
            <HomeProductBestSale cate={'laptop'} srcImgBanner={require('~/assets/images/phu-kien-hot.png')} />
        </div>
    );
}

export default Home;
