import classNames from 'classnames/bind';
import styles from './HomeProductBestSale.module.scss';
import ProductBestSale from '../ProductBestSale/index';
import dataBestSale from '~/data/data.json';

const cx = classNames.bind(styles);

function HomeProductBestSale({ cate, srcImgBanner }) {
    const product = dataBestSale.filter((item) => item.category === cate);
    return (
        <div className={cx('wrapper-outer')}>
            <ProductBestSale data={product} title={cate} srcImg={srcImgBanner} />
        </div>
    );
}

export default HomeProductBestSale;
