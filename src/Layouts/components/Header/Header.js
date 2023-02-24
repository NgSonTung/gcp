import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faUser, faUserCircle, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { CartIcon, FacebookIcon } from '~/Icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import config from '~/config';
import Search from './Search/Search';

const cx = classNames.bind(styles);

const Header = () => {
    const [showLoginMenu, setShowLoginMenu] = useState(false);

    return (
        <div className={cx('header-wrapper')}>
            <div className={cx('top-container-layout')}>
                <div className={cx('top-header')}>
                    <div className={cx('left-top-header')}>
                        <FontAwesomeIcon icon={faPhone} />
                        <p className={cx('hotline')}>HOTLINE: 0969882266</p>
                    </div>
                    <div className={cx('right-top-header')}>
                        {/* <button className={cx('fb-icon')}>
                            <FacebookIcon />
                        </button> */}
                        <div
                            className={cx('login-btn')}
                            onMouseOver={() => {
                                setShowLoginMenu(true);
                            }}
                            onMouseOut={() => setShowLoginMenu(false)}
                        >
                            <FontAwesomeIcon icon={faUser} />
                            <p className={cx('text')}>Đăng nhập</p>
                        </div>
                        {showLoginMenu && (
                            <div className={cx('menu-login-down')}>
                                <ul className={cx('menu-list')}>
                                    <li>
                                        <FontAwesomeIcon icon={faUserCircle} /> Đăng nhập
                                    </li>
                                    <li>
                                        <FontAwesomeIcon icon={faUserPlus} /> Đăng ký tài khoản
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className={cx('middle-header')}>
                <Link to={config.routes.home} className={cx('left-side-logo')}>
                    <div className={cx('logo')}>
                        <img src={require('~/assets/images/logo-page.png')} />
                    </div>
                </Link>
                <Search />
                <div className={cx('cart-feature')}>
                    <div className={cx('cart-btn')}>
                        <CartIcon className={cx('icon')} />
                    </div>
                    <div className={cx('cart-detail')}>
                        <Link className={cx('title')}>
                            <h1>Giỏ hàng</h1>
                        </Link>
                        <p className={cx('cart-quantity')}>(0) sản phẩm</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
