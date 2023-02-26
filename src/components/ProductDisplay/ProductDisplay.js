import classNames from 'classnames/bind';
import styles from './ProductDisplay.module.scss';

const cx = classNames.bind(styles);
const formatCurrency = (str) => {
    const regex = /\d{1,3}(?=(\d{3})+(?!\d))/g;
    return `${str.toString().replace(regex, '$&,')}₫`;
};

const ProductDisplay = (props) => {
    return (
        <div className={cx('product-container')}>
            <div className={cx('image-wrapper')}>
                <img
                    className={cx('product-image')}
                    src={props.newProduct.image}
                    alt={`${props.newProduct.product_name}-img`}
                />
            </div>
            <div className={cx('detail-wrapper')}>
                <div className={cx('product-title')}>{props.newProduct.name}</div>
                <p className={cx('product-price')}>{formatCurrency(props.newProduct.price)}</p>
                <div className={cx('feature-wrapper')}>
                    <p className={cx('feature')}>{props.newProduct.features?.map((feature, id) => feature + ' ')}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductDisplay;
