import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);

const Header = ({ setObject, setAllChecked }) => {
    const [headerTitles, setHeaderTitles] = useState([
        { title: 'PRODUCTS', active: false },
        { title: 'USERS', active: false },
        { title: 'REPORTS', active: false },
        { title: 'STATISTICS', active: false },
        { title: 'MARKETING', active: false },
    ]);
    const [activeHeader, setActiveHeader] = useState(0);

    useEffect(() => {
        if (activeHeader === 0) {
            setObject('product');
            setAllChecked(false);
        } else {
            setAllChecked(false);
            setObject('user');
        }
        headerTitles.forEach((item, index) => {
            item.active = index === activeHeader;
        });
        setHeaderTitles([...headerTitles]);
    }, [activeHeader]);

    return (
        <div className={cx('header-wrapper')}>
            <div className={cx('header-menu')}>
                <div className={cx('title-list')}>
                    {headerTitles.map((item, index) => (
                        <button
                            className={cx('title', { active: item.active })}
                            key={index}
                            onClick={() => setActiveHeader(index)}
                        >
                            {item.title}
                        </button>
                    ))}
                </div>
            </div>
            <div className={cx('user-feature')}>
                <div className={cx('icon-search')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faSearch} />
                </div>
                <div className={cx('icon-bell')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faBell} />
                </div>
                <div className={cx('user-avt')}>
                    <img src={require('~/assets/images/anh-khach-hang1.jpg')} alt="dog" />
                </div>
            </div>
        </div>
    );
};

export default Header;
