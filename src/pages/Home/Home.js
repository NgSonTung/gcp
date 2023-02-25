import classNames from 'classnames/bind';
import styles from './Home.module.scss';
// import CustomerSlider from './CustomerSlider/CustomerSlider';
import CustomerNavTitle from './CustomerNavTitle/CustomerNavTitle';
import TextTitle from './HomeTextTitle/HomeTextTitle';
import HomeProductBestSale from './BestSale/HomeProductBestSale/index';
import SliderBanner from './SliderBanner/SliderBanner';
const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrapper')}>
            <SliderBanner />
            <CustomerNavTitle />
            <TextTitle />
            <HomeProductBestSale />
        </div>
    );
}

export default Home;
