import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import React, { useState, useEffect, useRef } from 'react';
import { CloseIcon } from '../../Icons/Icons.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import * as UserFetch from '~/functions/UserFetch';
import jwt from 'jwt-decode';

import { CircularProgress } from '@mui/material';
import { useDebounce } from '~/Hooks';
const cx = classNames.bind(styles);

const Login = ({ classname, ToggleLogin, loginType = 'default' }) => {
    console.log(loginType);
    const [mode, setMode] = useState('login');
    const [signUpValue, setSignUpValue] = useState('');
    const [userExists, setUserExists] = useState(false);
    const debounceValue = useDebounce(signUpValue, 800);
    const isLoggedIn = useSelector((state) => state.UserReducer.isLoggedIn);

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
            }
        }
    }, [isLoggedIn]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const signInUsername = event.target.username[0].value;
        const signInPassword = event.target.password[0].value;
        const signUpUsername = event.target.username[1].value;
        const signUpPassword = event.target.password[1].value;
        const repeatPassword = event.target.repeatPassword.value;
        const signUpEmail = event.target.email.value;
        const login = {
            userName: signInUsername,
            password: signInPassword,
        };
        const token = await UserFetch.getJWTOfLogin('', login);
        console.log(token);
        if (token === false) {
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
            } else if (!userExists) {
                ToggleLogin();
                dispatch({
                    type: 'SIGNUP',
                    payload: {
                        userName: signUpUsername,
                        password: signUpPassword,
                        email: signUpEmail,
                    },
                });
            }
        }

        if (mode === 'login') {
            if (!isMountedRef.current) {
                isMountedRef.current = true;
            }
            if (loginType === 'user') {
                dispatch({
                    type: 'LOGIN',
                    payload: {
                        token,
                    },
                });
            }
            if (loginType === 'admin' && jwt(token.token).auth !== 1) {
                toast.error('Vui lòng đăng nhập bằng tài khoản có quyền admin', {
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
                dispatch({
                    type: 'LOGIN',
                    payload: {
                        loginType: loginType,
                        token,
                    },
                });
            }
        }
    };

    const checkOnChange = async (username) => {
        const user = await UserFetch.getUserByUserName('', username);
        if (user) {
            // console.log(user);
            setUserExists(true);
        } else {
            setUserExists(false);
        }
    };

    useEffect(() => {
        if (mode === 'signup') {
            checkOnChange(debounceValue);
        }
    }, [debounceValue]);

    return (
        <div className={cx('container', classname)}>
            <ToastContainer style={{ zIndex: 1000000 }} />
            <div className={cx(`form-block-wrapper`, `form-block-wrapper--is-${mode}`)}></div>
            <section className={cx(`form-block`, `form-block--is-${mode}`)}>
                <CloseIcon className={cx('close-icon')} onClick={() => ToggleLogin()} />

                <header className={cx('form-block__header')}>
                    <h1>{mode === 'login' ? 'Đăng nhập' : 'Đăng ký'}</h1>
                    {loginType === 'user' && (
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
                                onChange={(e) => setSignUpValue(e.target.value)}
                            />
                            {/* <CircularProgress className={cx('loadding')} /> */}
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
