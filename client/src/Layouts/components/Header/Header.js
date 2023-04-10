import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { CartIcon } from '~/Icons';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import config from '~/config';
import Search from './Search/Search';
import Login from '~/components/Login';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as CartFetch from '~/functions/CartFetch';
import { getAllCategories } from '~/functions/CategoryFetch';

const cx = classNames.bind(styles);

const Header = ({ type = 'default' }) => {
    const [categories, setCategories] = useState([]);
    const [showLogin, setShowLogin] = useState(false);
    const { isLoggedIn, userID, cartID } = useSelector((state) => state.UserReducer);
    // console.log(isLoggedIn);
    const [loginState, setLoginState] = useState(isLoggedIn);
    const getCategories = async () => {
        const fetchedData = await getAllCategories();
        const result = await fetchedData.data.categories;
        setCategories(result);
    };

    const ToggleLogin = () => {
        setShowLogin(showLogin ? false : true);
    };
    useEffect(() => {
        if (isLoggedIn && !loginState) {
            setLoginState(true);
            toast.success('Đăng nhập thành công!', {
                position: 'top-center',
                autoClose: 2001,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            });
        }
        getDataOfCartByUserID();
    }, [isLoggedIn]);
    useEffect(() => {
        if (!loginState && isLoggedIn) {
            HandleLogOut();
            const action = {
                type: 'LOAD_DEFAULT_CART_FROM_DB',
                payload: { product: [] },
            };
            dispatch(action);
        }
    }, [loginState]);
    const dispatch = useDispatch();

    const getDataOfCartByUserID = async () => {
        const url = `http://localhost:3001/api/v1/cart/?userID=${userID}`;
        let result = await CartFetch.getProductInCartByUSerID(url);
        // console.log('result && isLoggedIn', result && isLoggedIn);
        if (result && isLoggedIn) {
            const action = {
                type: 'LOAD_DEFAULT_CART_FROM_DB',
                payload: { product: result.result, userID: userID, cartID: cartID },
            };
            // console.log(action);
            dispatch(action);
        }
    };
    const HandleLogOut = () => {
        dispatch({ type: 'LOGOUT', payload: { isLoggedIn: false } });
        toast.success('Đã đăng xuất!', {
            position: 'top-center',
            autoClose: 2001,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
    }; //get location of cartIcon
    // const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    // useEffect(() => {
    //     const cartIcon = document.querySelector(`.${cx('cart-btn')}`);
    //     const locate = cartIcon.getBoundingClientRect();
    //     const location = {
    //         type: 'GET_LOCATION',
    //         payload: {
    //             bottom: locate.bottom,
    //             top: locate.top,
    //             right: locate.right,
    //             left: locate.left,
    //         },
    //     };
    //     dispatch(location);
    // }, [windowWidth]);
    useEffect(() => {
        getCategories();
        // window.addEventListener('resize', setWindowWidth);
        // return () => window.removeEventListener('resize', setWindowWidth);
    }, []);
    //get the product qty in cart
    const cartReducer = useSelector((state) => state.CartReducer);
    const productQty = cartReducer.cartItem.length;
    return (
        <div className={cx('header-wrapper')}>
            <ToastContainer style={{ zIndex: 999999999 }} />
            <div className={cx('header-navigation')}>
                <div className={cx('menu-container')}>
                    <ul className={cx('item-list')}>
                        <Link to={config.routes.home}>
                            <li>Home</li>
                        </Link>
                        <Link to={'/allProducts/allProducts'}>
                            <li>All Products</li>
                        </Link>
                        {categories?.map((item) => (
                            <Link key={item?.categoryID} to={`/category/${item?.categoryName}`}>
                                <li>{item?.categoryName}</li>
                            </Link>
                        ))}
                    </ul>
                    {!isLoggedIn ? (
                        <div className={cx('right-top-header')}>
                            <div className={cx('login-btn')} onClick={ToggleLogin}>
                                <FontAwesomeIcon icon={faUser} className={cx('user-icon')} />
                                <p className={cx('text')}>Đăng nhập</p>
                            </div>
                        </div>
                    ) : (
                        <div className={cx('right-top-header')}>
                            <div className={cx('login-btn')} onClick={() => setLoginState(false)}>
                                <FontAwesomeIcon icon={faUser} className={cx('user-icon')} />
                                <p className={cx('text')}>Đăng xuất</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {type !== 'admin' ? (
                <div className={cx('middle-header')}>
                    <Link to={config.routes.home} className={cx('left-side-logo')}>
                        <div className={cx('logo')}>
                            <img src={require('~/assets/images/logo-page.png')} />
                        </div>
                    </Link>
                    <Search />
                    <div className={cx('cart-feature')}>
                        <Link to={config.routes.checkout}>
                            <div className={cx('cart-btn')}>
                                <CartIcon className={cx('icon')} />
                            </div>
                        </Link>
                        <div className={cx('cart-detail')}>
                            <Link to={config.routes.checkout} className={cx('title')}>
                                <h1>Giỏ hàng</h1>
                            </Link>
                            <p className={cx('cart-quantity')}>({productQty}) sản phẩm</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={cx('middle-header')}></div>
            )}
            {showLogin && <Login loginType={type === 'default' ? 'user' : 'admin'} ToggleLogin={ToggleLogin} />}
        </div>
    );
};

export default Header;
