import classNames from 'classnames/bind';
import styles from './SearchCatalog.module.scss';
import { useState } from 'react';
import { CloseIcon, SearchIcon } from '~/Icons/Icons';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import images from '~/assets/images';
import useDebounce from '~/Hooks/useDebounce';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import CusPagination from '../../components/CusPagination/CusPagination';
import * as FetchFn from '~/functions/Fetch';
import ProductItem from '~/components/ProductItem/ProductItem';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);

const SearchCatalog = () => {
    let location = useLocation();
    let searchvalue = new URLSearchParams(location.search).get('name');
    let navigate = useNavigate();
    const [productSearched, setProductSearched] = useState([]);
    const [searchValue, setSearchValue] = useState(searchvalue);
    const [showLoading, setShowLoading] = useState(false);
    const debouncedValue = useDebounce(searchValue, 1000);
    const inputRef = useRef();
    const handlePage = (page) => setCurrentPage(page);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProduct, setTotalProduct] = useState(0);
    const [productPerPage, setProductPerPage] = useState(5);
    const [searchAPI, setSearchAPI] = useState('');
    const handleFilterProduct = (page) => {
        if (searchValue !== '') {
            let filteredURL = `http://localhost:3001/api/v1/product/?page=${page}&pageSize=${productPerPage}&name=${searchValue}`;
            setSearchAPI(filteredURL);
        }
    };

    const getSearchedData = async () => {
        const fetchedData = await FetchFn.getProductByName(searchAPI);
        const result = await fetchedData?.data?.products?.dataProducts;
        console.log(fetchedData);
        setProductSearched(result);
        setCurrentPage(fetchedData?.data?.products?.page);
        setTotalProduct(fetchedData?.data?.products?.totalProduct);
    };

    const handleSubmitSearch = (e) => {
        e.preventDefault();
    };

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            if (searchValue !== '') {
                e.preventDefault();
                navigate(`/searchcatalog/?name=${searchValue}`);
                handleFilterProduct(1, searchValue);
                console.log(location);
                console.log(new URLSearchParams(location.search).get('name'));
            }
        }
    };

    useEffect(() => {
        if (searchValue == '') {
            async function fetchData() {
                await getSearchedData();
            }
            fetchData();
        }
    }, []);

    useEffect(() => {
        if (searchValue) {
            async function getData() {
                await getSearchedData();
            }
            getData();
        }

        console.log(productSearched);
    }, [searchAPI]);

    useEffect(() => {
        async function fetchData() {
            handleFilterProduct(currentPage);
            await getSearchedData();
        }
        fetchData();
    }, [currentPage]);

    const handleInputChange = (e) => {
        const searchValue = e.target.value;
        const KEY_SPACE = /\s/g;

        if (!KEY_SPACE.test(searchValue[0])) {
            setSearchValue(searchValue);
        }
    };

    const handleClearInput = () => {
        setSearchValue('');
        setProductSearched([]);
        setCurrentPage(1);
        setTotalProduct(0);
        navigate(`/searchcatalog`);
        inputRef.current.focus();
    };

    return (
        <div className={cx('search-container')}>
            <div className={cx('search-input-container')}>
                <Link to={config.routes.home}>
                    <div className={cx('logo')}>
                        <img style={{ width: '120px' }} src={require('~/assets/images/logo-page.png')} alt="logo" />
                    </div>
                </Link>
                <div className={cx('search-input')}>
                    <form onSubmit={handleSubmitSearch}>
                        <input
                            type="text"
                            ref={inputRef}
                            value={searchValue}
                            placeholder="Nhập tên sản phẩm.."
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />
                        {!!searchValue && !showLoading > 0 && (
                            <button className={cx('clear-icon')} onClick={handleClearInput}>
                                <FontAwesomeIcon icon={faCircleXmark} className={cx('icon')} />
                            </button>
                        )}
                        {showLoading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                    </form>
                </div>
            </div>
            <div className={cx('content-wrapper')}>
                <h1 className={cx('title')}>Được tìm kiếm nhiều nhất</h1>
                <div className={cx('products-wrapper')}>
                    {productSearched?.map((item, index) => (
                        <div className={cx('product-item')}>
                            <ProductItem key={index} data={item} />
                        </div>
                    ))}
                </div>
            </div>
            <CusPagination
                itemPerPage={productPerPage}
                totalItem={totalProduct}
                handleFilterProduct={handleFilterProduct}
                handlePage={handlePage}
                page={currentPage}
            />
        </div>
    );
};

export default SearchCatalog;
