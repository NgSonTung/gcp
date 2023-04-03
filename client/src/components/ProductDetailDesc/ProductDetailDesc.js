import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ProductDetailDesc.module.scss';
import ProductRating from '../ProductRating/ProductRating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { fortmatCurrency } from '~/utils/FormatCurrency';
const cx = classNames.bind(styles);

// const formatCurrency = (str) => {
//     const regex = /\d{1,3}(?=(\d{3})+(?!\d))/g;
//     return `${str.toString().replace(regex, '$&,')}₫`;
// };

function ProductDetailDesc(props) {
    const { product, feature, rating, full = true, className } = props;
    // console.log(product);
    const dispatch = useDispatch();
    const [count, setCount] = useState(1);
    const handleDecrement = () => {
        if (count > 1) {
            setCount(count - 1);
            product.qty -= 1;
        }
    };

    const handleIncrement = () => {
        setCount(count + 1);
        if (product.qty === undefined) {
            product.qty = 1;
        } else {
            product.qty += 1;
        }
    };

    const handleCartAdd = () => {
        if (count > 0) {
            toast.success('Thêm sản phẩm thành công!', {
                position: 'top-center',
                autoClose: 2001,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            });
            //handle buy
            if (product.qty === undefined) {
                product.qty = 1;
            }
            const action = {
                type: 'ADD_TO_CART',
                payload: product,
            };
            dispatch(action);
            setCount(0);
            //update cart
        } else {
            toast.error('Vui lòng chọn số lượng sản phẩm!', {
                position: 'top-center',
                autoClose: 2001,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            });
        }
    };

    const handleBuyNow = () => {
        //mua ngay
        if (count <= 0) {
            toast.error('Vui lòng chọn số lượng sản phẩm!', {
                position: 'top-center',
                autoClose: 2001,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            });
        } else {
            if (product.amount === undefined) {
                product.amount = 1;
            }
            const action = {
                type: 'ADD_TO_CART',
                payload: product,
            };
            dispatch(action);
        }

        //move to checkout page
    };

    return (
        <div className={cx('product-detail-container', className)}>
            <ToastContainer style={{ zIndex: 1000000 }} />
            <p className={cx('product-detail-title')}> {product?.name}</p>
            {full && (
                <div className={cx('product-detail-subtitle')}>
                    <p className={cx('product-detail-id')}>{`Mã sản phẩm: ${product?.productID}`}</p>
                    <p className={cx('product-detail-brand')}>{`Thương hiệu: ${product?.brand}`}</p>
                </div>
            )}
            <p className={cx('product-detail-price')}>{fortmatCurrency(product?.price)}</p>
            {full && <ProductRating ratings={rating} />}
            <div className={cx('product-feature-wrapper')}>
                {feature?.map((feature, id) => (
                    <p className={cx('product-feature')} key={id}>
                        - {feature.feature}
                    </p>
                ))}
            </div>
            {full && (
                <div className={cx('counter')}>
                    <button className={cx('decrement', { disable: count <= 1 })} onClick={handleDecrement}>
                        -
                    </button>
                    <div className={cx('count-wrapper')}>
                        <span className={cx('count')}>{count}</span>
                    </div>
                    <button className={cx('increment')} onClick={handleIncrement}>
                        +
                    </button>
                </div>
            )}
            {full && (
                <>
                    <button className={cx('cart-add')} onClick={handleBuyNow}>
                        <FontAwesomeIcon className={cx('text-icon')} icon={faDollarSign} />
                        <span className={cx('text')}>Mua ngay</span>
                    </button>
                    <button className={cx('buy-now')} onClick={handleCartAdd}>
                        <FontAwesomeIcon className={cx('text-icon')} icon={faShoppingCart} />
                        <span className={cx('text')}>Thêm vào giỏ hàng</span>
                    </button>
                </>
            )}
        </div>
    );
}

export default ProductDetailDesc;
