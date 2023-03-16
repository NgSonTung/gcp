import classNames from 'classnames/bind';
import styles from './FilterTitle.module.scss';

const cx = classNames.bind(styles);

function FilterTitle({ title }) {
    return (
        <div className="wrapper">
            <p className={cx('title')}>{title}</p>
        </div>
    );
}

export default FilterTitle;
