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
    { title: 'Trang chủ', to: config.routes.home },
    { title: 'Giới thiệu', to: config.routes.introducePage },
    { title: 'Hướng dẫn mua hàng', to: config.routes.buyingInstruction },
    { title: 'Tin tức', to: config.routes.news },
    { title: 'Khuyến mãi', to: config.routes.discount },
    { title: 'Liên hệ', to: config.routes.contact },
    {
        title: 'Danh mục',
        to: '#',
        subMenu: [
            { title: 'Tất cả ', to: config.routes.allproducts },
            { title: 'Điện thoại', to: config.routes.phone },
            { title: 'Laptop', to: config.routes.laptop },
            { title: 'Tablet', to: config.routes.tablet },
            { title: 'Smart watch', to: config.routes.smartclock },
            { title: 'Thiết bị mạng', to: config.routes.networkdevice },
            { title: 'Bàn phím', to: config.routes.keyboard },
            { title: 'Loa', to: config.routes.speaker },
        ],
    },
];

const Header = () => {
    const [showLoginMenu, setShowLoginMenu] = useState(false);

    return (
        <div className={cx('header-wrapper')}>
            <div className={cx('header-navigation')}>
                <div className={cx('menu-container')}>
                    <ul className={cx('item-list')}>
                        {menuTitles.map((item, index) => (
                            <Link to={item.to}>
                                <li>
                                    {item.title}
                                    {item.subMenu && (
                                        <ul className={cx('sub-menu-container')}>
                                            {item.subMenu.map((item, index) => (
                                                <Link to={item.to} key={index}>
                                                    <li className={cx('sub-menu-item')}>{item.title}</li>
                                                </Link>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            </Link>
                        ))}
                    </ul>
                    <div className={cx('right-top-header')}>
                        <div
                            className={cx('login-btn')}
                            onMouseOver={() => {
                                setShowLoginMenu(true);
                            }}
                            onMouseOut={() => setShowLoginMenu(false)}
                        >
                            <FontAwesomeIcon icon={faUser} className={cx('user-icon')} />
                            <p className={cx('text')}>Đăng nhập</p>
                        </div>
                        {showLoginMenu && (
                            <div className={cx('menu-login-down')}>
                                <ul className={cx('menu-list')}>
                                    <li>
                                        <FontAwesomeIcon className={cx('icon')} icon={faUserCircle} /> Đăng nhập
                                    </li>
                                    <li>
                                        <FontAwesomeIcon className={cx('icon')} icon={faUserPlus} /> Đăng ký tài khoản
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
