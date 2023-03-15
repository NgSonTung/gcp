import React, { useEffect, useState } from 'react';
import style from './ItemInCart.module.scss';
import classNames from 'classnames/bind';
import { Container, Row, Col } from 'react-bootstrap';
import { fortmatCurrency } from '~/utils/FormatCurrency';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
const cx = classNames.bind(style);

const ItemInCart = (props) => {
    const { product } = props;
    const [number, setNumber] = useState(product.qty);
    const dispatch = useDispatch();
    useEffect(() => {
        // if (number < 1) {
        //     setNumber(1);
        // } else if (number > 99) {
        //     setNumber(99);
        // }
        product.qty = number;
        const action = {
            type: 'CHANGE_QTY',
            payload: product,
        };
        dispatch(action);
    }, [number]);
    //handler
    const handleIncrease = () => {
        number < 99 && setNumber(number + 1);
    };
    const handleDecrease = () => {
        if (number > 1) {
            setNumber(number - 1);
        }
    };
    const handleBlur = (e) => {
        console.log(typeof e.target.value);
        if (e.target.value < 1) {
            setNumber(1);
        } else if (e.target.value > 99) {
            setNumber(99);
        } else {
            setNumber(e.target.value);
        }
    };
    const handleClick = () => {
        const action = {
            type: 'DELETE_FROM_CART',
            payload: product,
        };
        dispatch(action);
    };
    return (
        <div className={cx('item-warpper')}>
            <Container>
                <Row className={cx('row')}>
                    <Col xs={4} sm={4} md={4} lg={4} className={cx('col-item-img')}>
                        <div className={cx('img-product')}>
                            <img src={product.image} alt="img-product" />
                        </div>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} className={cx('col-item-detail')}>
                        <div onClick={() => handleClick()} className={cx('delete-item')}>
                            <FontAwesomeIcon icon={faCircleXmark} className={cx('icon-delete')} />
                        </div>
                        <div className={cx('detail-item')}>
                            <span>{product.name}</span>
                            <span>{fortmatCurrency(product.price)}</span>
                        </div>
                        <div className={cx('controller-qty')}>
                            <div className={cx('ctrl-warpper')}>
                                <div>
                                    <span onClick={() => handleDecrease()} className={cx('btn-decrease')}>
                                        -
                                    </span>
                                    <input
                                        type="number"
                                        value={number}
                                        onChange={(e) => handleBlur(e)}
                                        className={cx('input-qty')}
                                        readOnly={false}
                                        className={cx('input-qty')}
                                    />
                                    <span onClick={() => handleIncrease()} className={cx('btn-increase')}>
                                        +
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <div className={cx('line')}></div>
        </div>
    );
};

export default ItemInCart;
