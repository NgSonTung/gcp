import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserCircle, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { CartIcon } from '~/Icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import config from '~/config';
import Search from './Search/Search';

const cx = classNames.bind(styles);

const menuTitles = [
    { title: 'Tất cả ', to: config.routes.allproducts },
    { title: 'Điện thoại', to: config.routes.phone },
    { title: 'Laptop', to: config.routes.laptop },
    { title: 'Tablet', to: config.routes.tablet },
    { title: 'Smart watch', to: config.routes.smartclock },
    { title: 'Thiết bị mạng', to: config.routes.networkdevice },
    { title: 'Bàn phím', to: config.routes.keyboard },
    { title: 'Loa', to: config.routes.speaker },
];
const Header = () => {
    return (
        <div className={cx('header-wrapper')}>
            <div className={cx('header-navigation')}>
                <div className={cx('menu-container')}>
                    <ul className={cx('item-list')}>
                        {menuTitles.map((item, index) => (
                            <Link key={index} to={item.to}>
                                <li>{item.title}</li>
                            </Link>
                        ))}
                    </ul>
                    <div className={cx('right-top-header')}>
                        <div className={cx('login-btn')}>
                            <FontAwesomeIcon icon={faUser} className={cx('user-icon')} />
                            <p className={cx('text')}>Đăng nhập</p>
                        </div>
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
