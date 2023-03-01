import React from 'react';
import classNames from 'classnames/bind';
import style from './HeaderProduct.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(style);

const HeaderProduct = (props) => {
    const { title = 'Sản Phẩm', count } = props;
    return (
        <div className={cx('header-product-wrapper')}>
            <div className={cx('header-product-title')}>
                <span>{title} </span>
                <span>{`(${count} Sản phẩm)`}</span>
            </div>
            <div className={cx('header-product-sort')}>
                <nav className={cx('sort-product')}>
                    <span>Sắp Xếp {<FontAwesomeIcon icon={faSortDown} className={cx('icon-sort-down')} />}</span>
                    <div className={cx('sort-menu')}>
                        <ul>
                            <li>Sắp xếp theo giá tăng dần</li>
                            <li>Sắp xếp theo giá giảm dần</li>
                        </ul>
                    </div>
                </nav>
                <nav className={cx('layout-icon')}>
                    <ul>
                        <li className={cx('GridViewIcon-icon')}>
                            <GridViewIcon fontSize={'large'} />
                        </li>
                        <li className={cx('ViewSidebarIcon-icon')}>
                            <ViewSidebarIcon fontSize={'large'} />
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default HeaderProduct;
