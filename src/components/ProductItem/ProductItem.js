import { faCompressAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductItem.module.scss';

const cx = classNames.bind(styles);

function ProductItem(props) {
    const { data, hotTag = false, secondLayout = false } = props;
    const [activeShow, setActiveShow] = useState(false);
    const icon = require('~/Icons/index');
    // console.log(data);
    let formatVnd = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    const itemPrice = formatVnd.format(data.price);
    return (
        <Link to={`/product/${data.name}`} styles={{ height: 'auto' }}>
            <div className={secondLayout ? cx('item-best-sale', 'active-second-layout') : cx('item-best-sale')}>
                <div className={hotTag ? cx('tag-best-sale', 'active-hot-tag') : cx('tag-best-sale')}>
                    <span>HOT</span>
                </div>
                <div
                    className={cx('box-avtar')}
                    onMouseOver={() => setActiveShow(true)}
                    onMouseOut={() => setActiveShow(false)}
                >
                    <img src={data.image} alt="avtar-Product" className={cx('avtar-product')} />
                    <div className={activeShow ? cx('action-product', 'active') : cx('action-product')}>
                        <Link to={`/product/${data.name}`}>
                            <span>{icon.SearchIcon('icon-search')}</span>
                        </Link>
                        <Link to={'/cart'}>
                            <span>{icon.CartIcon('icon-cart')}</span>
                        </Link>
                        <Link to={'/compare'}>
                            <span>{<FontAwesomeIcon icon={faCompressAlt} className={cx('icon-compare')} />}</span>
                        </Link>
                    </div>
                </div>
                <div className={cx('infor-item')}>
                    <span className={cx('title-product')}>{data.name}</span>
                    <span className={cx('price-product')}>{itemPrice}</span>
                </div>
            </div>
        </Link>
    );
}
export default ProductItem;
