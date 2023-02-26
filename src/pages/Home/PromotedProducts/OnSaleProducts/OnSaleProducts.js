import classNames from 'classnames/bind';
import styles from './OnSaleProducts.module.scss';
import OnSaleProductsSlider from '../OnSaleProducts/OnSaleProductsSlider/OnSaleProductsSlider';

const cx = classNames.bind(styles);

const bannerSrc = 'https://thanhmobile.vn/uploads/plugin/gallery/174/s-n-ph-m-m-i-gia.jpg';

const OnSaleProducts = () => {
    return (
        <div className={cx('container')}>
            <div className={cx('banner-container')}>
                <img alt={'sale-banner'} className={cx('banner-image')} src={bannerSrc} />
            </div>
            <OnSaleProductsSlider className={cx('slider')} />
        </div>
    );
};

export default OnSaleProducts;
