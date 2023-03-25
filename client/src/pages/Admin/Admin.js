import classNames from 'classnames/bind';
import styles from './Admin.module.scss';
import SideBar from './SideBar/SideBar';
import Header from './Header/Header';
import UserAction from './UserAction/UserAction';
import Search from './FilterData/Search/Search';
import { getAllProducts } from '~/functions/Fetch';
import LinkPaginate from './LinkPaginate/LinkPaginate';
import { useEffect, useState } from 'react';
import Login from '~/components/Login';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import CusPagination from '~/components/CusPagination/index';

// import useDebounce from '~/Hook/useDebounce';

const cx = classNames.bind(styles);

function Admin() {
    const [showLogin, setShowLogin] = useState(false);
    const { isLoggedIn } = useSelector((state) => state.UserReducer);
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
        console.log(productChange);
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
                    <div className={cx('content-wrapper')}>
                        <UserAction />
                        <Search />
                        <LinkPaginate data={productData} setProductChange={setProductChange} />
                    </div>
                </div>
            </div>
            <CusPagination itemPerPage={productPerPage} totalItem={totalProduct} handlePage={handlePage} />
            {showLogin && <Login loginType="admin" ToggleLogin={ToggleLogin} />}
        </div>
    );
}

export default Admin;
