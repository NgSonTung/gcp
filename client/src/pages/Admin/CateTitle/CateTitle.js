import classNames from 'classnames/bind';
import styles from './CateTitle.module.scss';
import Checkbox from '@mui/material/Checkbox';

const cx = classNames.bind(styles);

const cateTitles = [
    { title: 'Tên sản phẩm', checkbox: true },
    { title: 'Brand', checkbox: false },
    { title: 'Giá', checkbox: false },
];

const CateTitle = () => {
    return (
        <div className={cx('cate-title')}>
            {cateTitles &&
                cateTitles.map((item, index) =>
                    item.checkbox ? (
                        <div key={index} className={cx('description-link')}>
                            <Checkbox />
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
