import classNames from 'classnames/bind';
import styles from './AdminLayout.module.scss';
import Header from '../components/Header/Header';
import Footer from '../components/Footer';

const cx = classNames.bind(styles);

// Main layout chứa header, body content, footer
function MainLayout({ children }) {
    return (
        <div className={cx('layout-wrapper')}>
            <div className={cx('header-container')}>
                <Header type="admin" />
            </div>
            <div className={cx('content-container')}>{children}</div>
            <div className={cx('footer-container')}>
                <Footer />
            </div>
        </div>
    );
}

export default MainLayout;
