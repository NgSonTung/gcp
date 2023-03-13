import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import style from './HeaderProduct.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(style);

const HeaderProduct = (props) => {
    const {
        title = 'Sản Phẩm',
        activeLayoutType,
        count,
        handleSortDesc,
        handleSortAsc,
        handleNoSort,
        handleChangeLayout,
    } = props;

    const [activeMenuSort, setActiveMenuSort] = useState(false);

    const ref = useRef(null);
    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setActiveMenuSort(false);
        }
    };
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    });

    return (
        <div className={cx('header-product-wrapper')}>
            <div className={cx('header-product-title')}>
                <span>{title} </span>
                <span>{`(${count} Sản phẩm)`}</span>
            </div>
            <div className={cx('header-product-sort')}>
                <nav className={cx('sort-product')}>
                    <div
                        className={cx('sort-title')}
                        onClick={() => (activeMenuSort ? setActiveMenuSort(false) : setActiveMenuSort(true))}
                        ref={ref}
                    >
                        <ul>
                            <li>Sắp Xếp</li>
                            <li>{<FontAwesomeIcon icon={faSortDown} className={cx('icon-sort-down')} />}</li>
                        </ul>
                    </div>
                    <div className={activeMenuSort ? cx('sort-menu', 'active-menu-sort') : cx('sort-menu')}>
                        <ul>
                            <li onClick={() => handleNoSort()}>Tất cả</li>
                            <li onClick={() => handleSortAsc()}>Sắp xếp theo giá tăng dần</li>
                            <li onClick={() => handleSortDesc()}>Sắp xếp theo giá giảm dần</li>
                        </ul>
                    </div>
                </nav>
                <nav className={cx('layout-icon')}>
                    <ul>
                        <li
                            onClick={() => handleChangeLayout(1)}
                            className={
                                activeLayoutType ? cx('GridViewIcon-icon', 'activeColor') : cx('GridViewIcon-icon')
                            }
                        >
                            <GridViewIcon fontSize={'large'} />
                        </li>
                        <li
                            onClick={() => handleChangeLayout(0)}
                            className={
                                activeLayoutType === false
                                    ? cx('ViewSidebarIcon-icon', 'activeColor')
                                    : cx('ViewSidebarIcon-icon')
                            }
                        >
                            <ViewSidebarIcon fontSize={'large'} />
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default HeaderProduct;
