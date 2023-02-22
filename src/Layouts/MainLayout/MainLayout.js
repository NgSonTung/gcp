import classNames from 'classnames/bind';
import styles from './MainLayout.module.scss';
import Header from '../components/Header/Header';

const cx = classNames.bind(styles);

// Main layout chứa header, body content, footer
function MainLayout({ children }) {
    return (
        <div className={cx('layout-wrapper')}>
            <div className={cx('header-container')}>
                <Header />
            </div>
            <div className={cx('content-container')}>{children}</div>
        </div>
    );
}

export default MainLayout;
