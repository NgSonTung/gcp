import React, { useState } from 'react';
import style from './ItemInCart.module.scss';
import classNames from 'classnames/bind';
import { Container, Row, Col } from 'react-bootstrap';
import { fortmatCurrency } from '~/utils/FormatCurrency';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(style);

const ItemInCart = (props) => {
    const { product } = props;
    const [number, setNumber] = useState(product.qty);

    const handleIncrease = () => {
        number < 99 && setNumber(number + 1);
    };
    const handleDecrease = () => {
        number > 0 && setNumber(number - 1);
    };
    const handleBlur = (e) => {
        if (number < 1) {
            setNumber(1);
        } else if (number > 99) {
            setNumber(99);
        } else {
            setNumber(e.target.value);
        }
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
                        <div className={cx('delete-item')}>
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
                                        type="text"
                                        value={number}
                                        onChange={(e) => handleBlur(e)}
                                        className={cx('input-qty')}
                                        readOnly={false}
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
