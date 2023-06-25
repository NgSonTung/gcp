import classNames from 'classnames/bind';
import styles from './ProductDisplay.module.scss';
import { getURLProductImage } from '~/functions/ProductFetch';
import { useState } from 'react';
import { useEffect } from 'react';

const cx = classNames.bind(styles);
const formatCurrency = (str) => {
    const regex = /\d{1,3}(?=(\d{3})+(?!\d))/g;
    return `${str.toString().replace(regex, '$&,')}₫`;
};

const ProductDisplay = (props) => {
    const [imageSrc, setImageSrc] = useState(null);
    useEffect(() => {
        getURLProductImage([props.newProduct?.image]).then((result) => setImageSrc(result));
    }, [props.newProduct]);
    return (
        <div className={cx('product-container')}>
            <div className={cx('image-wrapper')}>
                <img className={cx('product-image')} src={imageSrc} alt={`${props.newProduct.name}-img`} />
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
