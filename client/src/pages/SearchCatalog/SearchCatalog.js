import classNames from 'classnames/bind';
import styles from './SearchCatalog.module.scss';
import { useState } from 'react';
import { CloseIcon, SearchIcon } from '~/Icons/Icons';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import images from '~/assets/images';
import useDebounce from '~/Hooks/useDebounce';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import CusPagination from '../../components/CusPagination/CusPagination';
import * as FetchFn from '~/functions/Fetch';
import ProductItem from '~/components/ProductItem/ProductItem';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const SearchCatalog = () => {
    const { searchvalue } = useParams();
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
    const [searched, setSearched] = useState(false);
    const handleFilterProduct = (page) => {
        let filteredURL = `http://localhost:3001/api/v1/product/?page=${page}&pageSize=${productPerPage}&`;
        filteredURL += `name=${searchValue}`;
        console.log(filteredURL);
        setSearchAPI(filteredURL);
    };

    const getSearchedDate = async () => {
        const fetchedData = await FetchFn.getProductByName(searchAPI, searchValue);
        const result = await fetchedData?.data?.products?.dataProducts;
        setProductSearched(result);
        setCurrentPage(fetchedData.data.products.page);
        setTotalProduct(fetchedData?.data?.products?.totalProduct);
        console.log(result);
        console.log(fetchedData);
    };

    const handleSubmitSearch = (e) => {
        e.preventDefault();
        handleFilterProduct();
        getSearchedDate();
    };

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            console.log(searchValue);
            navigate(`/searchcatalog/${searchValue}`);
            handleFilterProduct();
            getSearchedDate();
        }
    };

    // useEffect(() => {
    //     if (searched) {
    //         // fetch data immediately after user presses enter
    //         setSearched(false);
    //         handleFilterProduct(1);
    //         getSearchedDate();
    //     }
    // }, [searched]);

    // useEffect(() => {
    //     async function fetchData() {
    //         await handleFilterProduct(currentPage);
    //         await getSearchedDate();
    //     }
    //     fetchData();
    // }, [currentPage]);

    useEffect(() => {
        console.log('searchvalue changed');
        console.log(searchvalue);
        async function fetchData() {
            await handleFilterProduct(1);
            await getSearchedDate();
        }
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const searchValue = e.target.value;
        const KEY_SPACE = /\s/g;

        if (!KEY_SPACE.test(searchValue[0])) {
            setSearchValue(searchValue);
        }
        console.log(searchValue);
    };

    const handleClearInput = () => {
        setSearchValue('');
        setProductSearched([]);
        inputRef.current.focus();
    };

    return (
        <div className={cx('search-container')}>
            <div className={cx('search-input-container')}>
                <div className={cx('logo')}>
                    <img src={images.logo} alt="logo" />
                </div>
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
                        <button className={cx('search-icon')} type="submit">
                            <SearchIcon />
                        </button>
                    </form>
                </div>
                <button className={cx('close-icon')}>
                    <CloseIcon className={cx('icon')} />
                </button>
            </div>
            <div className={cx('content-wrapper')}>
                <h1 className={cx('title')}>Được tìm kiếm nhiều nhất</h1>
                <div className={cx('products-wrapper')}>
                    {productSearched.map((item, index) => (
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
