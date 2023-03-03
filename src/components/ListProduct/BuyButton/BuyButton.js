import React from 'react';
import classNames from 'classnames/bind';
import style from './BuyButton.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import FlyingButton from '../../FlyingItem/Fly';
const cx = classNames.bind(style);
const BuyButton = (props) => {
    const { srcImg, dataHover } = props;
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
                        src={srcImg}
                        dataHover={dataHover}
                        classForBtn={cx('btn-buy')}
                    />
                </div>
            </div>
        </div>
    );
};

export default BuyButton;
