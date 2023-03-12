import classNames from 'classnames/bind';
import styles from './FilterTool.module.scss';

const cx = classNames.bind(styles);

const FilterTool = () => {
    return (
        <div className={cx('filter-title')}>
            <div className={cx('icon-filter')}>
                <p className={cx('filter-text')}>LỌC DỮ LIỆU</p>
            </div>
            <div className={cx('reset-filter')}>
                <button>
                    <p className={cx('reset-text')}>Reset bộ lọc</p>
                </button>
            </div>
        </div>
    );
};

export default FilterTool;
