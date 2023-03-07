import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserCircle, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { CartIcon } from '~/Icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import config from '~/config';
import Search from './Search/Search';
import Login from '~/components/Login';
// import { useDispatch, useSelector } from 'react-redux';

const cx = classNames.bind(styles);

const menuTitles = [
    { title: 'Home', to: config.routes.home },
    { title: 'All Products', to: config.routes.allProducts },
    { title: 'Phone', to: config.routes.phone },
    { title: 'Laptop', to: config.routes.laptop },
    { title: 'Tablet', to: config.routes.tablet },
    { title: 'Watch', to: config.routes.watch },
    { title: 'Network Device', to: config.routes.networkDevice },
    { title: 'Keyboard', to: config.routes.keyboard },
];
const Header = () => {
    // const { loggedIn } = useSelector((state) => state.ProductReducer);
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch({ type: 'LOGIN', nameproduct });
    //     setProductLoaded(true);
    // }, [nameproduct]);
    const [showLogin, setShowLogin] = useState(false);
    const ToggleLogin = () => {
        setShowLogin(showLogin ? false : true);
    };

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
                    {!showLogin && (
                        <div className={cx('right-top-header')}>
                            <div className={cx('login-btn')} onClick={ToggleLogin}>
                                <FontAwesomeIcon icon={faUser} className={cx('user-icon')} />
                                <p className={cx('text')}>Đăng nhập</p>
                            </div>
                        </div>
                    )}
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
            {showLogin && <Login ToggleLogin={ToggleLogin} />}
        </div>
    );
};

export default Header;
