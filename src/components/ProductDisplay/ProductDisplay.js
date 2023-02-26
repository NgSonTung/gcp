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
                <a className={cx('product-title')} href="https://thanhmobile.vn/iphone-13-pro-128gb-likenew-99.html">
                    {props.newProduct.name}
                </a>
                <p className={cx('product-price')}>{formatCurrency(props.newProduct.price)}</p>
                <ul className={cx('feature-wrapper')}>
                    {props.newProduct.features?.map((feature, id) => {
                        return (
                            <li key={id} className={cx('feature')}>
                                {feature}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default ProductDisplay;
