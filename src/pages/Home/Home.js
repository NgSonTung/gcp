import classNames from 'classnames/bind';
import styles from './Home.module.scss';
// import CustomerSlider from './CustomerSlider/CustomerSlider';
import CustomerNavTitle from './CustomerNavTitle/CustomerNavTitle';
import TextTitle from './HomeTextTitle/HomeTextTitle';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrapper')}>
            <CustomerNavTitle />
            <TextTitle />
        </div>
    );
}

export default Home;
