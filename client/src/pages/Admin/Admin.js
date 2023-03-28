import classNames from 'classnames/bind';
import styles from './Admin.module.scss';
// import SideBar from './SideBar/SideBar';
import Header from './Header/Header';
import UserAction from './UserAction/UserAction';
import Search from './FilterData/Search/Search';
import { getAllProducts } from '~/functions/ProductFetch';
import LinkPaginate from './LinkPaginate/LinkPaginate';
import { useEffect, useState } from 'react';
import Login from '~/components/Login';
import { useSelector, shallowEqual } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import CusPagination from '~/components/CusPagination/index';

// import useDebounce from '~/Hook/useDebounce';

const cx = classNames.bind(styles);

function Admin() {
    const [showLogin, setShowLogin] = useState(false);
    const { isLoggedIn, jwt, isAdmin } = useSelector((state) => state.UserReducer);
    const [loginState, setLoginState] = useState(isLoggedIn);
    const [productData, setProductDatas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productPerPage, setProductPerPage] = useState(10);
    const [totalProduct, setTotalProduct] = useState(0);
    const [productChange, setProductChange] = useState(false);
    const handlePage = (page) => setCurrentPage(page);

    const ToggleLogin = () => {
        setShowLogin(showLogin ? false : true);
    };
    useEffect(() => {
        if (!isLoggedIn) {
            setShowLogin(true);
        }
    }, []);
    useEffect(() => {
        productChange && handleGetData();
    }, [productChange]);
    useEffect(() => {
        if (isLoggedIn && !loginState) {
            setLoginState(true);
            toast.success('Đăng nhập thành công!', {
                position: 'top-center',
                autoClose: 2001,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            });
        }
    }, [isLoggedIn]);

    const handleGetData = async () => {
        const fetchedData = await getAllProducts(
            `http://localhost:3001/api/v1/product/?page=${currentPage}&pageSize=${productPerPage}`,
        );
        const result = fetchedData?.data?.products?.dataProducts;
        setProductDatas(result);
        setTotalProduct(fetchedData?.data?.products?.totalProduct);
        setProductChange(false);
    };

    useEffect(() => {
        handleGetData();
    }, [currentPage]);

    return (
        <div className={cx('wrapper')}>
            <ToastContainer style={{ zIndex: 999999999 }} />
            <div className={cx('body-layout')}>
                <div className={cx('left-side')}>{/* <SideBar /> */}</div>
                <div className={cx('right-side')}>
                    <Header />
                    {isAdmin && (
                        <div className={cx('content-wrapper')}>
                            <UserAction jwt={jwt} setProductChange={setProductChange} />
                            <Search />
                            {jwt && <LinkPaginate data={productData} jwt={jwt} setProductChange={setProductChange} />}
                            <CusPagination
                                itemPerPage={productPerPage}
                                totalItem={totalProduct}
                                handlePage={handlePage}
                            />
                        </div>
                    )}
                </div>
            </div>
            {showLogin && <Login loginType="admin" ToggleLogin={ToggleLogin} />}
        </div>
    );
}

export default Admin;
