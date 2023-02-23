import classNames from 'classnames/bind';
import styles from './NavTitle.module.scss';
import { React, useState, useRef } from 'react';

const cx = classNames.bind(styles);
const NavTitle = (props) => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <>
            <ul className={cx('title-container')}>
                {props.navItems.map((item, index) => {
                    const isActive = activeIndex === index;
                    return (
                        <li
                            key={item.id}
                            className={cx('title-wrapper', { active: isActive })}
                            onClick={() => {
                                setActiveIndex(index);
                            }}
                        >
                            <a className={cx('title')} href="#">
                                {item.title}
                            </a>
                        </li>
                    );
                })}
            </ul>
            <div className={cx('active-component')}>{props.navItems[activeIndex].component}</div>
        </>
    );
};
export default NavTitle;
