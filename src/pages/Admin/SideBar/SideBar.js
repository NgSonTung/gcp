import classNames from 'classnames/bind';
import styles from './SideBar.module.scss';

const cx = classNames.bind(styles);

const SideBar = () => {
    return (
        <div className={cx('title-wrapper')}>
            <p className={cx('title')}>Dead Link</p>
        </div>
    );
};

export default SideBar;
