import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ProductDetailDesc.module.scss';
import ProductRating from '../ProductRating/ProductRating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faDollarSign, faTrash, faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { useRef, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { fortmatCurrency } from '~/utils/FormatCurrency';
import { deleteFeatureById, addFeature, updateFeatureById } from '~/functions/FeatureFetch';

const cx = classNames.bind(styles);

// const formatCurrency = (str) => {
//     const regex = /\d{1,3}(?=(\d{3})+(?!\d))/g;
//     return `${str.toString().replace(regex, '$&,')}₫`;
// };

function ProductDetailDesc({
    handleGetData = () => {},
    HandleSetProductData = () => {},
    jwt = '',
    brands,
    type = 'default',
    product,
    feature,
    rating,
    full = true,
    className,
}) {
    const formRef = useRef();
    // console.log(product);
    const dispatch = useDispatch();
    const [count, setCount] = useState(1);
    const getBrandNameById = (brandID) => {
        const brand = brands?.find((brand) => brand.brandID === brandID);
        return brand ? brand.brandName : null;
    };
    const HandleFeatureDelete = (id) => {
        const msgPromise = deleteFeatureById(id, jwt);
        msgPromise.then((msg) => {
            alert(msg);
            handleGetData();
            HandleSetProductData();
        });
    };
    // useEffect(() => {
    //     console.log();
    // }, [feature]);
    const HandleFeatureUpdate = (id, inputID) => {
        const newFeature = { feature: formRef.current[inputID].value, productID: feature[0].productID };
        const msgPromise = updateFeatureById(id, newFeature, jwt);
        msgPromise.then((msg) => {
            alert(msg);
            handleGetData();
            HandleSetProductData();
        });
    };

    const HandleSubmit = (e) => {
        e.preventDefault();
        if (formRef.current['newFeature'].value) {
            const newFeature = { feature: formRef.current['newFeature'].value, productID: feature[0].productID };
            const msgPromise = addFeature(newFeature, jwt);
            msgPromise.then((msg) => {
                alert(msg);
                handleGetData();
                HandleSetProductData();
            });
        } else {
            alert('Hãy điền thông tin feature muốn thêm');
        }
    };
    const handleDecrement = () => {
        if (count > 1) {
            setCount(count - 1);
            product.amount -= 1;
        }
    };

    const handleIncrement = () => {
        setCount(count + 1);
        if (product.amount === undefined) {
            product.amount = 1;
        } else {
            product.amount += 1;
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
            product.amount = count;
            console.log(product);
            const action = {
                type: 'ADD_TO_CART',
                payload: product,
                url: 'http://localhost:3001/api/v1/checkout',
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
            product.amount = count;
            const action = {
                type: 'ADD_TO_CART',
                payload: product,
                url: 'http://localhost:3001/api/v1/checkout',
            };
            dispatch(action);

            window.location.href = 'http://localhost:3000/checkout';
        }

        //move to checkout page
    };

    return (
        <div className={cx('product-detail-container', className)}>
            <ToastContainer style={{ zIndex: 1000000 }} />
            {type !== 'admin' && <p className={cx('product-detail-title')}> {product?.name}</p>}
            {full && type !== 'admin' && (
                <div className={cx('product-detail-subtitle')}>
                    <p className={cx('product-detail-id')}>{`Mã sản phẩm: ${product?.productID}`}</p>
                    <p className={cx('product-detail-brand')}>{`Thương hiệu: ${getBrandNameById(product?.brandID)}`}</p>
                </div>
            )}
            {type !== 'admin' && <p className={cx('product-detail-price')}>{fortmatCurrency(product?.price)}</p>}
            {full && type !== 'admin' && <ProductRating ratings={rating} />}
            {type !== 'admin' ? (
                <div className={cx('product-feature-wrapper')}>
                    {feature?.map((feature, id) => (
                        <p className={cx('product-feature')} key={id}>
                            - {feature.feature}
                        </p>
                    ))}
                </div>
            ) : (
                <form onSubmit={(e) => HandleSubmit(e)} ref={formRef}>
                    <div className={cx('product-feature-wrapper')}>
                        {feature?.map((feature, id) => (
                            <div className={cx('input-wrapper')}>
                                <input
                                    className={cx('input')}
                                    defaultValue={feature.feature}
                                    type="text"
                                    id={`feature${id}`}
                                    name={`feature${id}`}
                                    // required
                                />
                                <FontAwesomeIcon
                                    className={cx('icon')}
                                    icon={faFileUpload}
                                    onClick={() => HandleFeatureUpdate(feature.featureID, `feature${id}`)}
                                />
                                <FontAwesomeIcon
                                    className={cx('icon')}
                                    icon={faTrash}
                                    onClick={() => HandleFeatureDelete(feature.featureID)}
                                />
                            </div>
                        ))}
                    </div>
                    <div className={cx('newInput-wrapper')}>
                        <input
                            placeholder="vd: Sản phẩm này cực xịn"
                            className={cx('newInput')}
                            type="text"
                            id={`newFeature`}
                            name={`newFeature`}
                        />
                        <button className={cx('product-feature-add')}>
                            <p>Thêm Feature</p>
                        </button>
                    </div>
                </form>
            )}

            {full && type !== 'admin' && (
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
            {full && type !== 'admin' && (
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
