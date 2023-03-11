import React from 'react';
import style from './Footer.module.scss';
import classNames from 'classnames/bind';
import { Row, Container, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(style);

const Footer = () => {
    return (
        <Container className={cx('footer-warpper')}>
            <Row>
                <Col xs={12} sm={12} md={12} lg={12}>
                    <div className={cx('footer-about-us')}>
                        <span>About Us</span>
                        <p>
                            Được thành lập từ năm 2010, Thanh Luxury Mobile được ghi nhận là một trong những Apple Store
                            Việt Nam. Với hơn 5 năm kinh nghiệm về lĩnh vực kinh doanh về các dòng máy tính, điện thoại,
                            máy tính bảng Mac-iPhone-iPad
                        </p>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xs={12} sm={12} md={12} lg={12}>
                    <div className={cx('footer-location')}>
                        <ul>
                            <li>
                                <FontAwesomeIcon icon={faLocationDot} />
                                <span>496 Lê Hồng Phong, Phường 1, Quận 10, TP. HCM, Việt Nam</span>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faPhone} />
                                <span>0973666647</span>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faEnvelope} />
                                <span>3thangbangroup@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xs={12} sm={12} md={12} lg={12}>
                    <div className={cx('footer-icon')}>
                        <span>Copyright by 3thangbanGroup</span>
                        <ul>
                            <li>
                                <img src={require('~/assets/images/visa.png')} alt="visa" />
                            </li>
                            <li>
                                <img src={require('~/assets/images/mc_symbol_opt_73_3x.png')} alt="mastercard" />
                            </li>
                            <li>
                                <img src={require('~/assets/images/paypal-icon.png')} alt="paypal" />
                            </li>
                        </ul>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Footer;
