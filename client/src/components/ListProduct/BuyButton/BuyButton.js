import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import style from './BuyButton.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import FlyingButton from '../../FlyingItem/Fly';
import { useSelector } from 'react-redux';
const cx = classNames.bind(style);
const BuyButton = (props) => {
    const { srcImg, dataHover = '', productId } = props;
    const location = useSelector((state) => state.LocationReducer);
    const heightOfWindow = window.innerHeight;
    const widthOfWindow = window.innerWidth;
    console.log('productId', productId);
    return (
        <div className={cx('buy-button-warpper')}>
            <div className={cx('buy-button')}>
                <div className={cx('container')}>
                    <FlyingButton
                        children={
                            <div>
                                <FontAwesomeIcon icon={faCartPlus} className={cx('cart-icon')} />
                            </div>
                        }
                        productId={productId}
                        src={srcImg}
                        dataHover={dataHover}
                        classForBtn={cx('btn-buy')}
                        targetTop={`${((location.top / heightOfWindow) * 100).toFixed(2)}%`}
                        targetLeft={`${((location.left / widthOfWindow) * 100).toFixed(2)}%`}
                    />
                </div>
            </div>
        </div>
    );
};

export default BuyButton;
