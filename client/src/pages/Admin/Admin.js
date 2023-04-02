import classNames from 'classnames/bind';
import styles from './Admin.module.scss';
// import SideBar from './SideBar/SideBar';
import Header from './Header/Header';
import UserAction from './UserAction/UserAction';
import Search from './FilterData/Search/Search';
import { getAllProducts } from '~/functions/ProductFetch';
import { getAllUsers } from '~/functions/UserFetch';
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
    const { isLoggedIn, jwt, isAdmin } = useSelector((state) => state.UserReducer);
    const [loginState, setLoginState] = useState(isLoggedIn);
    const [data, setData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [productPerPage, setProductPerPage] = useState(10);
    const [totalProduct, setTotalProduct] = useState(0);
    const [dataChange, setDataChange] = useState(false);
    const [allChecked, setAllChecked] = useState(false);
    const [deleteIds, setDeleteIds] = useState([]);
    const [object, setObject] = useState('product');

    const handlePage = (page) => setCurrentPage(page);

    const handleCheckAll = () => {
        setAllChecked(!allChecked);
    };

    const ToggleLogin = () => {
        setShowLogin(showLogin ? false : true);
    };

    const HandleAddDelete = (id, isChecked) => {
        isChecked
            ? setDeleteIds((prevIds) => [...prevIds, id])
            : setDeleteIds((prevIds) => prevIds.filter((item) => item !== id));
    };

    // useEffect(() => {
    //     console.log(currentPage);
    // }, [currentPage]);

    const handleGetData = async () => {
        let fetchedData;
        if (object === 'product') {
            fetchedData = await getAllProducts(
                `http://localhost:3001/api/v1/product/?page=${currentPage}&pageSize=${productPerPage}`,
            );
            setTotalProduct(fetchedData?.data?.products?.totalProduct);
            setData({ object: object, data: fetchedData?.data?.products?.dataProducts });
        } else if (object === 'user') {
            fetchedData = await getAllUsers(`?page=${currentPage}&pageSize=${productPerPage}`);
            setTotalProduct(fetchedData?.data?.users?.totalUser);
            setData({ object: object, data: fetchedData?.data?.users?.dataUsers });
        }
        setDataChange(false);
    };

    useEffect(() => {
        if (!isLoggedIn) {
            setShowLogin(true);
        }
    }, []);
    useEffect(() => {
        dataChange && handleGetData();
    }, [dataChange]);
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

    useEffect(() => {
        handleGetData();
    }, [currentPage, object]);

    return (
        <div className={cx('wrapper')}>
            <ToastContainer style={{ zIndex: 999999999 }} />
            <div className={cx('body-layout')}>
                <div className={cx('left-side')}>{/* <SideBar /> */}</div>
                <div className={cx('right-side')}>
                    <Header setObject={setObject} />
                    {isAdmin && (
                        <div className={cx('content-wrapper')}>
                            <UserAction
                                object={object}
                                setAllChecked={setAllChecked}
                                setDeleteIds={setDeleteIds}
                                deleteIds={deleteIds}
                                jwt={jwt}
                                setDataChange={setDataChange}
                            />
                            <Search />
                            {jwt && (
                                <LinkPaginate
                                    object={object}
                                    HandleAddDelete={HandleAddDelete}
                                    handleCheckAll={handleCheckAll}
                                    allChecked={allChecked}
                                    data={data}
                                    jwt={jwt}
                                    setDataChange={setDataChange}
                                />
                            )}
                            <CusPagination
                                itemPerPage={productPerPage}
                                totalItem={totalProduct}
                                handlePage={handlePage}
                                handleFilterProduct={() => {}}
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
