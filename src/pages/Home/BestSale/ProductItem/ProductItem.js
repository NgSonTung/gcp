import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './ProductItem.module.scss';
const cx = classNames.bind(styles);

function ProductItem({ data }) {
    return (
        <Link to={`/product/${data.id}`}>
            <div className={cx('item-best-sale')}>
                <div className={cx('tag-best-sale')}>
                    <span>HOT</span>
                </div>
                <div className={cx('box-avtar')}>
                    <img src={data.image} alt="avtar-Product" className={cx('avtar-product')} />
                    <div className={cx('action-product')}>
                        <span>icon</span>
                        <span>icon</span>
                        <span>icon</span>
                    </div>
                </div>
                <div className={cx('infor-item')}>
                    <span className={cx('title-product')}>{data.name}</span>
                    <span className={cx('price-product')}>{data.price}đ</span>
                </div>
            </div>
        </Link>
    );
}
export default ProductItem;
