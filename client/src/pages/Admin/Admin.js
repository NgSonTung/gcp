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
import CusPagination from '~/components/CusPagination/index';
import { getAllCategories } from '~/functions/CategoryFetch';
import { getAllBrands } from '~/functions/BrandFetch';
import Page401 from '~/components/401/Page401';

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
    const [brands, setBrands] = useState();
    const [categories, setCategories] = useState();
    const [isDeleted, setIsDeleted] = useState(false);
    const handlePage = (page) => setCurrentPage(page);

    const handleCheckAll = () => {
        setAllChecked(!allChecked);
    };

    const ToggleLogin = () => {
        setShowLogin(showLogin ? false : true);
    };

    const HandleAddDelete = (id) => {
        let idsArr = [...deleteIds];
        if (deleteIds.length === totalProduct) {
            setDeleteIds([]);
            setAllChecked(true);
        } else {
            if (idsArr.length === 0) {
                idsArr.push(id);
                console.log('delete arr1', idsArr);
            } else if (!idsArr.includes(id)) {
                idsArr.push(id);
                console.log('delete arr2', idsArr);
            } else if (idsArr.includes(id)) {
                idsArr = idsArr.filter((item) => item !== id);
                console.log('delete arr3', deleteIds);
            }
            setDeleteIds(idsArr);
        }
    };

    // useEffect(() => {
    //     console.log(deleteIds);
    // });

    const handleGetAllIdChecked = () => {
        let ids = [];
        if (object === 'product') {
            let allIdsArr = data?.data.map((item) => item.productID);
            if (deleteIds.length === 0) {
                ids = [...allIdsArr];
                console.log(ids);
            } else {
                ids = [...allIdsArr, ...deleteIds];
                console.log(ids);
            }
        } else {
            let allIdsArr = data?.data.map((item) => item.userID);
            if (deleteIds.length === 0) {
                ids = [...allIdsArr];
                console.log(ids);
            } else {
                ids = [...allIdsArr, ...deleteIds];
                console.log(ids);
            }
        }
        setDeleteIds(ids);
    };

    useEffect(() => {
        if (allChecked) {
            handleGetAllIdChecked();
        } else {
            setDeleteIds([]);
        }
    }, [allChecked]);

    const handleGetBrandsnCategories = async () => {
        const fetchedBrands = await getAllBrands();
        const fetchedCategories = await getAllCategories();
        setBrands(fetchedBrands.data.brands);
        setCategories(fetchedCategories.data.categories);
    };

    const handleStateDeleted = () => {
        setIsDeleted(false);
    };

    const handleGetData = async () => {
        let fetchedData;
        if (object === 'product') {
            fetchedData = await getAllProducts(
                `http://localhost:3001/api/v1/product/?page=${currentPage}&pageSize=${productPerPage}`,
            );
            setTotalProduct(fetchedData?.data?.products?.totalProduct);
            setData({ object: object, data: fetchedData?.data?.products?.dataProducts });
        } else if (object === 'user') {
            setAllChecked(true);
            fetchedData = await getAllUsers(`?page=${currentPage}&pageSize=${productPerPage}`);
            setTotalProduct(fetchedData?.data?.users?.totalUser);
            setData({ object: object, data: fetchedData?.data?.users?.dataUsers });
        }
        setAllChecked(false);
        setDataChange(false);
    };
    useEffect(() => {
        console.log('isLoggedIn,', isLoggedIn);
        console.log('isAdmin', isAdmin);
    }, [isLoggedIn, isAdmin]);
    useEffect(() => {
        if (!isLoggedIn) {
            setShowLogin(true);
        }
        handleGetBrandsnCategories();
    }, []);
    useEffect(() => {
        dataChange && handleGetData();
    }, [dataChange]);
    useEffect(() => {
        if (isLoggedIn && !loginState) {
            setLoginState(true);
        }
    }, [isLoggedIn]);

    useEffect(() => {
        handleGetData();
    }, [currentPage, object]);

    const handleDataChange = () => {
        setDataChange(true);
    };

    const openProductDetail = () => {
        setIsDeleted(!isDeleted);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('body-layout')}>
                <div className={cx('left-side')}>{/* <SideBar /> */}</div>
                <div className={cx('right-side')}>
                    <Header setObject={setObject} setAllChecked={setAllChecked} />
                    {isAdmin && (
                        <div className={cx('content-wrapper')}>
                            <UserAction
                                brands={brands}
                                categories={categories}
                                object={object}
                                setAllChecked={setAllChecked}
                                setDeleteIds={setDeleteIds}
                                deleteIds={deleteIds}
                                jwt={jwt}
                                handleDataChange={handleDataChange}
                                handleStateDeleted={handleStateDeleted}
                            />
                            <Search />
                            {jwt && (
                                <LinkPaginate
                                    brands={brands}
                                    categories={categories}
                                    object={object}
                                    HandleAddDelete={HandleAddDelete}
                                    handleCheckAll={handleCheckAll}
                                    allChecked={allChecked}
                                    data={data}
                                    jwt={jwt}
                                    handleDataChange={handleDataChange}
                                    openProductDetail={openProductDetail}
                                    isDeleted={isDeleted}
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
                    {isLoggedIn && !isAdmin && <Page401 />}
                </div>
            </div>
            {showLogin && <Login loginType="admin" ToggleLogin={ToggleLogin} />}
        </div>
    );
}

export default Admin;
