import classNames from 'classnames/bind';
import styles from './HomeProductBestSale.module.scss';
import ProductBestSale from '../ProductBestSale/index';
const cx = classNames.bind(styles);

function HomeProductBestSale() {
    return (
        <div className={cx('owl-wrapper-outer')}>
            <ProductBestSale />
        </div>
    );
}

export default HomeProductBestSale;
