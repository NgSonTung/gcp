import classNames from 'classnames/bind';
import styles from './CustomerNavTitle.module.scss';
import NavTitle from '~/components/NavTitle/NavTitle';
import CustomerSlider from './CustomerSlider/CustomerSlider';

const cx = classNames.bind(styles);
const navItems = [{ id: '1', title: 'KHÁCH HÀNG THANH LUXURY MOBILE', component: <CustomerSlider /> }];

const CustomerNavTitle = () => {
    return (
        <div className={cx('wrapper')}>
            <NavTitle navItems={navItems} />
        </div>
    );
};

export default CustomerNavTitle;
