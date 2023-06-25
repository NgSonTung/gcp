import classNames from 'classnames/bind';
import styles from './NavTitle.module.scss';
import { React, useState } from 'react';

// prop: [{id:'',title:'',component:<component/>},...]

const cx = classNames.bind(styles);
const NavTitle = (props) => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className={props.className}>
            <ul className={cx('title-container')}>
                {props.navItems.map((item, index) => {
                    const isActive = activeIndex === index;
                    return (
                        <li
                            key={index}
                            className={cx('title-wrapper', { active: isActive })}
                            onClick={() => {
                                setActiveIndex(index);
                            }}
                        >
                            <div className={cx('title')}>{item.title}</div>
                        </li>
                    );
                })}
            </ul>
            <div className={cx('active-component')}>{props.navItems[activeIndex].component}</div>
        </div>
    );
};
export default NavTitle;
