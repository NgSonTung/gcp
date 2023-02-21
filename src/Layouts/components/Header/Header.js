import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

const Header = () => {
    return (
        <div className={cx('header-wrapper')}>
            <h1>Header</h1>
        </div>
    );
};

export default Header;
