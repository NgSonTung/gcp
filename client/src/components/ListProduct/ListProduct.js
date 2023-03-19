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

const brands = ['Iphone', 'Xiaomi', 'Samsung', 'Vivo', 'Hp', 'Asus', 'Oppo', 'Acer', 'Linksys', 'Mesh'];

const cx = classNames.bind(style);
export const ListProduct = (props) => {
    const {
        ColOnPerRowSmallest = 6,
        ColOnPerRowSmall = 6,
        ColOnPerRowMiddle = 3,
        ColOnPerRowLarge = 3,
        ColOnPerRowExtraLarge = 2,
    } = props;
    // const baseData = useRef(data);
    // baseData.current = data;
    // const [sorted, setSorted] = useState('');
    const [productData, setProductDatas] = useState([]);
    // const [product, setProduct] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productPerPage, setProductPerPage] = useState(5);
    const [activeLayoutType, setActiveLayoutType] = useState(true);
    const [widthWindow, setWidthWindow] = useState(window.innerWidth);
    const indexOfLastProduct = currentPage * productPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productPerPage;
    const currentProduct = productData?.slice(indexOfFirstProduct, indexOfLastProduct);
    const handlePage = (page) => setCurrentPage(page);
    const [priceRange, setPriceRange] = useState([0, 30000000]);
    const [brandFilter, setBrandFilter] = useState([]);
    const [urlAPI, setUrlAPI] = useState('');
    const handleFilterProduct = () => {
        let filteredURL = 'http://localhost:3001/?';
        let first = 0;
        if (brandFilter.length > 0) {
            let i = 0;
            for (i; i < brandFilter.length; i++) {
                if (i <= 0) {
                    filteredURL += 'brand=' + `${brandFilter[i]}`;
                    console.log(filteredURL);
                } else {
                    filteredURL += '&brand=' + `${brandFilter[i]}`;
                    console.log(filteredURL);
                }
            }
        }
        if (priceRange.length > 0) {
            if (priceRange[0] !== priceRange[1]) {
                filteredURL += `&price[eq]=${priceRange[0] * 1}&price[lt]=${priceRange[1] * 1}`;
            } else {
                filteredURL += `&price[gte]=${priceRange[0] * 1}`;
            }
        }
        setUrlAPI(filteredURL);
        console.log(urlAPI);
    };

    const handleGetData = async () => {
        const fetchedData = await getAllProducts(urlAPI);
        const result = fetchedData?.data?.products;
        setProductDatas(result);
    };
    useEffect(() => {
        console.log(urlAPI);
        handleGetData();
    }, [urlAPI]);

    // useEffect(() => {
    //     setProduct(productData);
    //     console.log(productData);
    // }, [sorted]);
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    //change page
    //sort-data
    // const handleSortDesc = () => {
    //     const dataSorted = [...data].sort((a, b) => (a.price < b.price ? 1 : -1));
    //     setProductDatas(dataSorted);
    //     setSorted('desc');
    // };

    // const handleSortAsc = () => {
    //     const dataSorted = [...data].sort((a, b) => a.price - b.price);
    //     setProductDatas(dataSorted);
    //     setSorted('asc');
    // };
    // const handleNoSort = () => {
    //     setProductDatas(baseData.current);
    //     setSorted('no sort');
    // };
    //change layout
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

    useEffect(() => {
        console.log(brandFilter);
        console.log(priceRange);
    }, [brandFilter, handleChanges]);

    return (
        <div className={cx('product-warpper')}>
            <HeaderProduct
                count={productData?.length}
                // handleSortDesc={handleSortDesc}
                // handleSortAsc={handleSortAsc}
                // handleNoSort={handleNoSort}
                handleChangeLayout={handleChangeLayout}
                activeLayoutType={activeLayoutType}
            />
            <div className={cx('content-wrapper')}>
                <div className={cx('filter-features')}>
                    <div className={cx('keyword-search')}>
                        <FilterTitle title="TỪ KHÓA" />
                        <input type="text" placeholder="Từ khóa tìm kiếm" />
                    </div>

                    <div className={cx('price-range')}>
                        <FilterTitle title="GIÁ SẢN PHẨM" />
                        <Slider
                            value={priceRange}
                            min={0}
                            max={3000000}
                            onChange={handleChanges}
                            valueLabelDisplay="auto"
                        />
                        The selected range is {priceRange[0]} - {priceRange[1]}
                    </div>

                    <div className={cx('brand-filter')}>
                        <FilterTitle title="THƯƠNG HIỆU" />
                        <div className={cx('filter-wrapper')}>
                            {brands.map((item, index) => (
                                <div className={cx('checkbox')} key={index}>
                                    <input
                                        type="checkbox"
                                        value={item.toLocaleLowerCase()}
                                        onChange={addBrandFilter}
                                        id={item.toLocaleLowerCase()}
                                    />
                                    <label for={item.toLocaleLowerCase()}>{item}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={cx('filter-btn')} onClick={handleFilterProduct}>
                        <FontAwesomeIcon icon={faArrowsRotate} />
                        <p>LỌC SẢN PHẨM</p>
                    </div>
                    <div className={cx('reset-btn')}>
                        <FontAwesomeIcon icon={faArrowsRotate} />
                        <p>CHỌN LẠI</p>
                    </div>
                </div>

                <div className={cx('list-product')}>
                    {activeLayoutType ? (
                        <Row>
                            {currentProduct?.map((item, index) => (
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
                            {currentProduct?.map((item, index) => (
                                <Row>
                                    <Col xs={12} sm={12} md={12} lg={12} xxl={12} className={cx('col-product-item')}>
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
                                                        dataHover={widthWindow < 1060 ? `Thêm` : 'Thêm vào giỏ hàng'}
                                                        productID={item?.productID}
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
            </div>
            <CusPagination itemPerPage={productPerPage} totalItem={productData?.length} handlePage={handlePage} />
        </div>
    );
};

export default ListProduct;
