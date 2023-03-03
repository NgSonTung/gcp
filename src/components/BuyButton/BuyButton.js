import React from 'react';
import classNames from 'classnames/bind';
import style from './BuyButton.module.scss';
const cx = classNames.bind(style);
const BuyButton = () => {
    return (
        <div className={cx('buy-button-warpper')}>
            <span className={cx('buy-button')}>Mua Hàng</span>
        </div>
    );
};

export default BuyButton;
