import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import React, { useState, useEffect, useRef } from 'react';
import { CloseIcon } from '../../Icons/Icons.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import * as UserFetch from '~/functions/UserFetch';
const cx = classNames.bind(styles);

const Login = ({ classname, ToggleLogin, loginType = 'default' }) => {
    const [mode, setMode] = useState('login');
    const { isLoggedIn, isAdmin, userID } = useSelector((state) => state.UserReducer) || {};
    const dispatch = useDispatch();
    const toggleMode = () => {
        var newMode = mode === 'login' ? 'signup' : 'login';
        setMode(newMode);
    };
    const isMountedRef = useRef(false);
    useEffect(() => {
        if (isMountedRef.current) {
            if (isLoggedIn) {
                ToggleLogin();
            } else {
                toast.error('Tên đăng nhập hoặc mật khẩu không chính xác!', {
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
        }
    }, [isLoggedIn]);
    // const userFetch = async (username) => {
    //     const user = await UserFetch.getUserIDByName(username);
    //     dispatch({
    //         type: 'CHECK_EXISTS',
    //         payload: user,
    //     });
    // };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const signInUsername = event.target.username[0].value;
        const signInPassword = event.target.password[0].value;
        const signUpUsername = event.target.username[1].value;
        const signUpPassword = event.target.password[1].value;
        const repeatPassword = event.target.repeatPassword.value;
        // userFetch(signInUsername);
        const userID = await UserFetch.getUserIDByName('', signInUsername);
        // console.log('signUpusn', signUpUsername);
        // console.log('signUpPassword', signUpPassword);
        // console.log('repeatPassword', repeatPassword);
        if (mode === 'signup') {
            if (signUpPassword !== repeatPassword) {
                toast.error('Nhập lại mật khẩu chưa chính xác!', {
                    position: 'top-center',
                    autoClose: 2001,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                });
            } else {
                ToggleLogin();
            }
        }

        if (mode === 'login') {
            if (!isMountedRef.current) {
                isMountedRef.current = true;
            }

            dispatch({
                type: 'LOGIN',
                payload: {
                    userName: signInUsername,
                    password: signInPassword,
                    userID,
                },
            });
        }
    };
    return (
        <div className={cx('container', classname)}>
            <ToastContainer style={{ zIndex: 1000000 }} />
            <div className={cx(`form-block-wrapper`, `form-block-wrapper--is-${mode}`)}></div>
            <section className={cx(`form-block`, `form-block--is-${mode}`)}>
                <CloseIcon className={cx('close-icon')} onClick={() => ToggleLogin()} />

                <header className={cx('form-block__header')}>
                    <h1>{mode === 'login' ? 'Đăng nhập' : 'Đăng ký'}</h1>
                    {loginType === 'default' && (
                        <div className={cx('form-block__toggle-block')}>
                            <span>{mode === 'login' ? 'Chưa' : 'Đã'} có tài khoản? Bấm vào đây &#8594;</span>
                            <input id="form-toggler" className="input-toggle" type="checkbox" onClick={toggleMode} />
                            <label className={cx('toggler')} htmlFor="form-toggler"></label>
                        </div>
                    )}
                </header>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className={cx('form-block__input-wrapper')}>
                        <div className={cx('form-group', 'form-group--login')}>
                            <input
                                className={cx('form-group__input')}
                                type="text"
                                placeholder="tên đăng nhập"
                                disabled={mode === 'signup'}
                                name="username"
                                required
                                autoComplete="username"
                            />
                            <input
                                className={cx('form-group__input')}
                                type="password"
                                placeholder="mật khẩu"
                                disabled={mode === 'signup'}
                                name="password"
                                autoComplete="password"
                                required
                            />
                        </div>
                        <div className={cx('form-group', 'form-group--signup')}>
                            <input
                                className={cx('form-group__input')}
                                type="text"
                                placeholder="tên đăng nhập"
                                disabled={mode === 'login'}
                                name="username"
                                autoComplete="username"
                                required
                            />
                            <input
                                className={cx('form-group__input')}
                                type="email"
                                id="email"
                                placeholder="email"
                                disabled={mode === 'login'}
                                autoComplete="email"
                                name="email"
                                required
                            />
                            <input
                                className={cx('form-group__input')}
                                type="password"
                                placeholder="mật khẩu"
                                disabled={mode === 'login'}
                                autoComplete="password"
                                name="password"
                                required
                            />
                            <input
                                className={cx('form-group__input')}
                                type="password"
                                placeholder="nhập lại mật khẩu"
                                disabled={mode === 'login'}
                                name="repeatPassword"
                                required
                            />
                        </div>
                    </div>
                    <button className={cx('button', 'button--primary', 'full-width')} type="submit">
                        {mode === 'login' ? 'Đăng nhập' : 'Đăng ký'}
                    </button>
                </form>
            </section>
        </div>
    );
};

export default Login;
