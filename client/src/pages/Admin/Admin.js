import classNames from 'classnames/bind';
import styles from './Admin.module.scss';
import SideBar from './SideBar/SideBar';
import Header from './Header/Header';
import UserAction from './UserAction/UserAction';
import Search from './FilterData/Search/Search';
import data from '~/data/products.json';
import LinkPaginate from './LinkPaginate/LinkPaginate';
// import useDebounce from '~/Hook/useDebounce';

const cx = classNames.bind(styles);

function Admin() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('body-layout')}>
                <div className={cx('left-side')}>
                    <SideBar />
                </div>
                <div className={cx('right-side')}>
                    <Header />
                    <div className={cx('content-wrapper')}>
                        <UserAction />
                        <Search />
                        <LinkPaginate itemsPerPage={4} data={data} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;
