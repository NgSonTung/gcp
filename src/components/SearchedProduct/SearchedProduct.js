import classNames from 'classnames/bind';
import styles from './SearchedProduct.module.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fortmatCurrency } from '~/utils/FormatCurrency';
import { getURLProductImage } from '~/functions/ProductFetch';

const cx = classNames.bind(styles);
function SearchProducts({ data }) {
    const [imageSrc, setImageSrc] = useState(null);
    useEffect(() => {
        getURLProductImage([data?.image]).then((result) => setImageSrc(result));
    }, [data]);
    return (
        <Link to={`/product/${data.name}`} className={cx('wrapper')}>
            <img src={imageSrc} alt={imageSrc} />
            <div className={cx('product-info')}>
                <p className={cx('product-name')}>{data.name}</p>
                <div className={cx('price-info')}>
                    <p className={cx('sale-price')}>{fortmatCurrency(data?.price)}</p>
                </div>
            </div>
        </Link>
    );
}

export default SearchProducts;
