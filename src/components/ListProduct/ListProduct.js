import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import style from './ListProduct.module.scss';
import ProductItem from '~/components/ProductItem/index';
import CusPagination from '~/components/CusPagination/index';
import { Row, Col, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import HeaderProduct from './HeaderProduct/index';
import BuyButton from '~/components/ListProduct/BuyButton/index';
import ProductDetailDesc from '../ProductDetailDesc/index';
import FilterTitle from '../FilterTitle/FilterTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import Slider from '@mui/material/Slider';
import { getAllProducts } from '~/functions/Fetch';
import { getAllBrands } from '~/functions/BrandFetch';
import { fortmatCurrency } from '~/utils/FormatCurrency';
// import { useParams } from 'react-router-dom';

const cx = classNames.bind(style);
export const ListProduct = (props) => {
    const {
        ColOnPerRowSmallest = 6,
        ColOnPerRowSmall = 6,
        ColOnPerRowMiddle = 3,
        ColOnPerRowLarge = 3,
        ColOnPerRowExtraLarge = 2,
        categoryName,
    } = props;

    const [productData, setProductDatas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productPerPage, setProductPerPage] = useState(10);
    const [activeLayoutType, setActiveLayoutType] = useState(true);
    const [widthWindow, setWidthWindow] = useState(window.innerWidth);
    const handlePage = (page) => setCurrentPage(page);
    const [priceRange, setPriceRange] = useState([0, 50000000]);
    const [brandFilter, setBrandFilter] = useState([]);
    const [productKeyword, setProductKeyword] = useState('');
    const [urlAPI, setUrlAPI] = useState('');
    const [sortKey, setSortKey] = useState('');
    const [totalProduct, setTotalProduct] = useState(0);
    const [brands, setBrands] = useState([]);
    const brandInputRef = useRef();

    const handleGetBrandsAPI = async () => {
        const fetchedResult = await getAllBrands();
        const data = await fetchedResult?.data?.brands;
        setBrands(data);
    };

    const handleFilterProduct = (page) => {
        let filteredURL = `http://localhost:3001/api/v1/product/?page=${page}&pageSize=${productPerPage}&`;
        if (categoryName !== 'allProducts' && categoryName !== undefined) {
            filteredURL += `&categoryName=${categoryName}`;
        }
        if (brandFilter.length > 0) {
            let i = 0;
            for (i; i < brandFilter.length; i++) {
                if (i <= 0) {
                    filteredURL += '&brandID=' + `${brandFilter[i]}`;
                } else {
                    filteredURL += '&brandID=' + `${brandFilter[i]}`;
                }
            }
        }
        if (priceRange.length > 0) {
            if (priceRange[0] !== priceRange[1] && priceRange[1] !== 50000000 && priceRange[0] !== 0) {
                filteredURL += `&price[gt]=${priceRange[0] * 1}&price[lt]=${priceRange[1] * 1}`;
            } else if (priceRange[0] !== priceRange[1] && priceRange[1] !== 50000000 && priceRange[0] === 0) {
                filteredURL += `&price[lt]=${priceRange[1] * 1}`;
            } else if (priceRange[0] === priceRange[1]) {
                filteredURL += `&price[gte]=${priceRange[0] * 1}`;
            }
            console.log(filteredURL);
        }
        if (productKeyword.length > 0) {
            filteredURL += `&name=${productKeyword}`;
        }

        if (sortKey.length > 0) {
            filteredURL += `&sort=${sortKey}`;
        }

        setUrlAPI(filteredURL);
    };

    const handleGetData = async () => {
        const fetchedData = await getAllProducts(urlAPI);
        const result = fetchedData?.data?.products?.dataProducts;
        await setProductDatas(result);
        await setTotalProduct(fetchedData?.data?.products?.totalProduct);
        await setCurrentPage(fetchedData?.data?.products?.page);
    };

    useEffect(() => {
        handleFilterProduct();
        handleGetData();
        console.log(categoryName);
    }, [sortKey, categoryName]);

    useEffect(() => {
        handleGetData();
    }, [urlAPI]);

    useEffect(() => {
        handleGetBrandsAPI();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleChangeLayout = (num) => {
        num === 1 ? setActiveLayoutType(true) : setActiveLayoutType(false);
    };
    // resize window
    const handleResize = () => {
        setWidthWindow(window.innerWidth);
    };

    function handleChanges(event, newValue) {
        const newRangeValue = event.target.value;
        setPriceRange(newRangeValue);
        console.log(priceRange);
    }

    const addBrandFilter = (e) => {
        let filterValue = e.target.value;
        let filterArray = [...brandFilter];
        if (!filterArray.includes(filterValue)) {
            filterArray = [...filterArray, filterValue];
        } else {
            filterArray = filterArray.filter((item) => item !== filterValue);
        }
        setBrandFilter(filterArray);
    };

    const handleSearchValue = (e) => {
        setProductKeyword(e.target.value);
    };

    const handleResetFilter = () => {
        setBrandFilter([]);
        setProductKeyword('');
        setPriceRange([0, 50000000]);
        brandInputRef.current.checked = false;
        console.log(brandInputRef);
        setUrlAPI('');
    };

    const handleSortDesc = () => {
        setSortKey('desc');
    };

    const handleSortAsc = () => {
        setSortKey('asc');
    };

    const handleNoSort = () => {
        setSortKey('');
    };

    return (
        <div className={cx('product-warpper')}>
            <HeaderProduct
                count={totalProduct}
                handleSortDesc={handleSortDesc}
                handleSortAsc={handleSortAsc}
                handleNoSort={handleNoSort}
                handleChangeLayout={handleChangeLayout}
                activeLayoutType={activeLayoutType}
            />
            <div className={cx('content-wrapper')}>
                <Row>
                    <Col xs={4} sm={3} md={3} lg={3}>
                        <div className={cx('filter-features')}>
                            <div className={cx('keyword-search')}>
                                <FilterTitle title="TỪ KHÓA" />
                                <input
                                    type="text"
                                    placeholder="Từ khóa tìm kiếm"
                                    value={productKeyword}
                                    onChange={handleSearchValue}
                                />
                            </div>

                            <div className={cx('price-range')}>
                                <FilterTitle title="GIÁ SẢN PHẨM" />
                                <Slider
                                    value={priceRange}
                                    min={0}
                                    max={50000000}
                                    onChange={handleChanges}
                                    valueLabelDisplay="auto"
                                    size="small"
                                />
                                Giá tiền {fortmatCurrency(priceRange[0])} - {fortmatCurrency(priceRange[1])}
                            </div>

                            <div className={cx('brand-filter')}>
                                <FilterTitle title="THƯƠNG HIỆU" />
                                <div className={cx('filter-wrapper')}>
                                    {brands?.map((item, index) => (
                                        <div className={cx('checkbox')} key={index}>
                                            <input
                                                type="checkbox"
                                                value={item?.brandID}
                                                onChange={addBrandFilter}
                                                id={item?.brandID}
                                                ref={brandInputRef}
                                            />
                                            <label for={item?.brandID}>{item?.brandName}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={cx('filter-btn')} onClick={() => handleFilterProduct(1)}>
                                <FontAwesomeIcon icon={faArrowsRotate} />
                                <p>LỌC SẢN PHẨM</p>
                            </div>
                            <div className={cx('reset-btn')} onClick={handleResetFilter}>
                                <FontAwesomeIcon icon={faArrowsRotate} />
                                <p>CHỌN LẠI</p>
                            </div>
                        </div>
                    </Col>
                    <Col xs={8} sm={9} md={9} lg={9}>
                        <div className={cx('list-product')}>
                            {activeLayoutType ? (
                                <Row className={cx('row-container')}>
                                    {productData?.map((item, index) => (
                                        <Col
                                            xs={ColOnPerRowSmallest}
                                            sm={ColOnPerRowSmall}
                                            md={ColOnPerRowMiddle}
                                            lg={ColOnPerRowLarge}
                                            xxl={ColOnPerRowExtraLarge}
                                            className={cx('col-product-item')}
                                        >
                                            <div className={cx('product-item')} key={index}>
                                                <ProductItem data={item} />
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            ) : (
                                <Container>
                                    {productData?.map((item, index) => (
                                        <Row>
                                            <Col
                                                xs={12}
                                                sm={12}
                                                md={12}
                                                lg={12}
                                                xxl={12}
                                                className={cx('col-product-item')}
                                            >
                                                <div className={cx('product-item')}>
                                                    <Col xs={5} sm={5} md={4} lg={4}>
                                                        <ProductItem key={index} data={item} secondLayout={true} />
                                                    </Col>
                                                    <Col xs={7} sm={7} md={8} lg={8} className={cx('col-buy-button')}>
                                                        <div className={cx('product-detail')}>
                                                            <ProductDetailDesc
                                                                key={index}
                                                                product={item}
                                                                full={false}
                                                                className={cx('infor-product')}
                                                            />

                                                            <BuyButton
                                                                srcImg={item?.image}
                                                                dataHover={
                                                                    widthWindow < 1060 ? `Thêm` : 'Thêm vào giỏ hàng'
                                                                }
                                                                product={item}
                                                            />
                                                        </div>
                                                    </Col>
                                                </div>
                                            </Col>
                                        </Row>
                                    ))}
                                </Container>
                            )}
                        </div>
                    </Col>
                </Row>
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

export default ListProduct;
