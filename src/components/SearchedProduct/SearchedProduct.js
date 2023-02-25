import classNames from 'classnames/bind';
import styles from './SearchedProduct.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
function SearchProducts({ data }) {
    return (
        <Link to={`/product/${data.name}`} className={cx('wrapper')}>
            <img src={data.image} alt={data.image} />
            <div className={cx('product-info')}>
                <p className={cx('product-name')}>{data.name}</p>
                <div className={cx('price-info')}>
                    <p className={cx('sale-price')}>
                        {data?.price.toLocaleString('it-IT', {
                            style: 'currency',
                            currency: 'VND',
                        })}
                    </p>
                    <p className={cx('old-price')}>
                        {(data?.price * data?.old_price).toLocaleString('it-IT', {
                            style: 'currency',
                            currency: 'VND',
                        })}
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default SearchProducts;
