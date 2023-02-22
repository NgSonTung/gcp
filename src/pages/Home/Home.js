import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import CustomerSlider from '../../pages/Home/CustomerSlider/CustomerSlider';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrapper')}>
            <CustomerSlider />
        </div>
    );
}

export default Home;
