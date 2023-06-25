import classNames from 'classnames/bind';
import styles from './CateTitle.module.scss';
import Checkbox from '@mui/material/Checkbox';
import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);

const productTitle = [
    { title: 'ID', checkbox: true },
    { title: 'Tên sản phẩm', checkbox: false },
    { title: 'Thương hiệu', checkbox: false },
    { title: 'Giá', checkbox: false },
];

const userTitle = [
    { title: 'ID', checkbox: true },
    { title: 'Tên đăng nhập', checkbox: false },
    { title: 'Email', checkbox: false },
    { title: 'Quyền', checkbox: false },
];

const CateTitle = ({ object, checked, handleCheckAll }) => {
    const [isChecked, setIsChecked] = useState(checked);
    const HandleCheck = () => {
        setIsChecked(!isChecked);
        handleCheckAll();
    };
    useEffect(() => {
        setIsChecked(checked);
    }, [checked]);
    return (
        <div className={cx('cate-title')}>
            {object === 'product' &&
                productTitle.map((item, index) =>
                    item.checkbox ? (
                        <div key={index} className={cx('description-link')}>
                            <Checkbox checked={isChecked} onClick={HandleCheck} />
                            <p className={cx('title-text')}>{item.title}</p>
                        </div>
                    ) : (
                        <div key={index} className={cx('title-text')}>
                            <p>{item.title}</p>
                        </div>
                    ),
                )}
            {object === 'user' &&
                userTitle.map((item, index) =>
                    item.checkbox ? (
                        <div key={index} className={cx('description-link')}>
                            <Checkbox checked={isChecked} onClick={HandleCheck} />
                            <p className={cx('title-text')}>{item.title}</p>
                        </div>
                    ) : (
                        <div key={index} className={cx('title-text')}>
                            <p>{item.title}</p>
                        </div>
                    ),
                )}
        </div>
    );
};

export default CateTitle;
