import classNames from 'classnames/bind';
import styles from './SpecialProducts.module.scss';
import SpecialProductSlider from '../SpecialProducts/SpecialProductSlider/SpecialProductSlider';

const cx = classNames.bind(styles);

const bannerSrc = 'https://thanhmobile.vn/uploads/plugin/gallery/174/s-n-ph-m-m-i-gia.jpg';

const SpecialProducts = () => {
    return (
        <div className={cx('container')}>
            <div className={cx('banner-container')}>
                <img alt={'sale-banner'} className={cx('banner-image')} src={bannerSrc} />
            </div>
            <SpecialProductSlider className={cx('slider')} />
        </div>
    );
};

export default SpecialProducts;
