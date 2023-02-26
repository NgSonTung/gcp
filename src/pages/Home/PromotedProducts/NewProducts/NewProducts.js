import classNames from 'classnames/bind';
import styles from './NewProducts.module.scss';
import NewProductSlider from './NewProductSlider/NewProductSlider';

const cx = classNames.bind(styles);
const bannerSrc = 'https://thanhmobile.vn/uploads/plugin/gallery/174/s-n-ph-m-m-i-gia.jpg';

const NewProducts = () => {
    return (
        <div className={cx('container')}>
            <div className={cx('banner-container')}>
                <img alt={'sale-banner'} className={cx('banner-image')} src={bannerSrc} />
            </div>
            <NewProductSlider className={cx('slider')} />
        </div>
    );
};

export default NewProducts;
