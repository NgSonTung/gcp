import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './CheckoutPage.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import ItemInCart from './ItemInCart/index';

const cx = classNames.bind(style);
const CheckoutPage = () => {
    const cartItem = useSelector((state) => state.CartReducer);
    useEffect(() => {}, [cartItem]);

    return (
        <div className={cx('check-out-warpper')}>
            <Container className={cx('container-check-out')}>
                <Row className={cx('row-box')}>
                    <Col xs={12} sm={12} md={5} lg={5} className={cx('col-box')}>
                        <div className={cx('check-out-infor')}>
                            <div className={cx('box-infor')}>
                                {cartItem.cartItem.length === 0 ? (
                                    <p>Không có sản phẩm trong giỏ hàng</p>
                                ) : (
                                    cartItem.cartItem.map((item, index) => <ItemInCart key={index} product={item} />)
                                )}
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={7} lg={7} className={cx('col-box')}>
                        <div className={cx('check-out-address')}></div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default CheckoutPage;
