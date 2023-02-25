import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import CustomerNavTitle from './CustomerNavTitle/CustomerNavTitle';
import TextTitle from './HomeTextTitle/HomeTextTitle';
import HomeProductBestSale from './BestSale/HomeProductBestSale/index';
import ProductNavTitle from './ProductNavTitle/ProductNavTitle';
const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrapper')}>
            <CustomerNavTitle />
            <TextTitle />
            <HomeProductBestSale />
            <ProductNavTitle />
        </div>
    );
}

export default Home;
