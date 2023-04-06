import classNames from 'classnames/bind';
import style from './CheckoutPage.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import ItemInCart from './ItemInCart/index';
import { fortmatCurrency } from '~/utils/FormatCurrency.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmileWink } from '@fortawesome/free-solid-svg-icons';
import { getURLProductImage } from '~/functions/ProductFetch';
import { useEffect } from 'react';
import { useState } from 'react';
const cx = classNames.bind(style);
const CheckoutPage = () => {
    let cartItem = useSelector((state) => state.CartReducer);
    const [data, setData] = useState(null);
    // console.log('cartItem', data);
    useEffect(() => {
        let item = [];
        let listImage = [];
        cartItem?.cartItem.forEach((p) => listImage.push(p.image));
        getURLProductImage(listImage).then((result) => {
            for (let i = 0; i < result.length; i++) {
                item.push({ product: cartItem.cartItem[i], productImage: result[i] });
            }

            setData(item);
        });
    }, [cartItem]);
    return (
        <div className={cx('check-out-warpper')}>
            <Container className={cx('container-check-out')}>
                <Row className={cx('row-box')}>
                    {cartItem?.cartItem.length === 0 ? (
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
                                            {data?.map((item, index) => (
                                                <ItemInCart
                                                    key={index}
                                                    product={item.product}
                                                    productImage={item.productImage}
                                                />
                                            ))}
                                        </>
                                    </div>
                                    {data?.length !== 0 && (
                                        <div className={cx('total-price-warpper')}>
                                            <span>Thành Tiền :</span>
                                            <span>{fortmatCurrency(cartItem?.total)}</span>
                                        </div>
                                    )}
                                </div>
                            </Col>
                            <Col xs={12} sm={12} md={7} lg={7} className={cx('col-box')}>
                                <div className={cx('check-out-address-warpper')}>
                                    <div className={cx('check-out-address')}>
                                        <div className={cx('shipping-details')}>
                                            {/* <div className={cx('name-details')}></div>
                                            <div className={cx('adress-details')}></div>
                                            <div className={cx('city-details')}></div> */}
                                            <form>
                                                <input type="submit" value="Submit" />
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </>
                    )}
                </Row>
            </Container>
        </div>
    );
};

export default CheckoutPage;
