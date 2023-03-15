import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './CheckoutPage.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import ItemInCart from './ItemInCart/index';
import { fortmatCurrency } from '~/utils/FormatCurrency.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmile, faFaceSmileWink } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(style);
const CheckoutPage = () => {
    const cartItem = useSelector((state) => state.CartReducer);
    // useEffect(() => {}, [cartItem]);
    // console.log('cartItem.total', cartItem.total);
    // console.log(cartItem);
    return (
        <div className={cx('check-out-warpper')}>
            <Container className={cx('container-check-out')}>
                <Row className={cx('row-box')}>
                    {cartItem.cartItem.length === 0 ? (
                        <>
                            <Col xs={12} sm={12} md={12} lg={12}>
                                <div className={cx('check-out-infor')}>
                                    <div className={cx('box-infor')}>
                                        <>
                                            <div className={cx('msg')}>
                                                <div className={cx('msg-cart')}>
                                                    <span>
                                                        Oops! Giỏ hàng của bạn hiện đang trống hãy thử mua sắm gì đó rồi
                                                        quay lại nhé ~ ~
                                                    </span>
                                                    <div className={cx('fun-icon')}>
                                                        <FontAwesomeIcon
                                                            icon={faFaceSmileWink}
                                                            className={cx('FaceSmileWink')}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    </div>
                                </div>
                            </Col>
                        </>
                    ) : (
                        <>
                            <Col xs={12} sm={12} md={5} lg={5} className={cx('col-box')}>
                                <div className={cx('check-out-infor')}>
                                    <div className={cx('box-infor')}>
                                        <>
                                            <span className={cx('title')}> THÔNG TIN ĐƠN HÀNG</span>
                                            {cartItem.cartItem.map((item, index) => (
                                                <ItemInCart key={index} product={item} />
                                            ))}
                                        </>
                                    </div>
                                    {cartItem.cartItem.length !== 0 && (
                                        <div className={cx('total-price-warpper')}>
                                            <span>Thành Tiền :</span>
                                            <span>{fortmatCurrency(cartItem.total)}</span>
                                        </div>
                                    )}
                                </div>
                            </Col>
                            <Col xs={12} sm={12} md={7} lg={7} className={cx('col-box')}>
                                <div className={cx('check-out-address-warpper')}>
                                    <div className={cx('check-out-address')}>
                                        <div className={cx('shipping-details')}>
                                            <div className={cx('name-details')}></div>
                                            <div className={cx('adress-details')}></div>
                                            <div className={cx('city-details')}></div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </>
                    )}
                </Row>
                {/* <Row>
                    <Col></Col>
                </Row> */}
            </Container>
        </div>
    );
};

export default CheckoutPage;
