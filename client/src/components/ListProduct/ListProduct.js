import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import style from './ListProduct.module.scss';
import styleCart from '~/Layouts/components/Header/Header.module.scss';
import ProductItem from '~/components/ProductItem/index';
import CusPagination from '~/components/CusPagination/index';
import { Row, Col, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import HeaderProduct from './HeaderProduct/index';
import BuyButton from '~/components/ListProduct/BuyButton/index';
import ProductDetailDesc from '../ProductDetailDesc/index';
import { useNavigate, useLocation } from 'react-router-dom';
import FilterTitle from '../FilterTitle/FilterTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';

const brands = ['Iphone', 'Xiaomi', 'Samsung', 'Vivo', 'Hp', 'Asus', 'Oppo', 'Acer', 'Linksys', 'Mesh'];

const cx = classNames.bind(style);
export const ListProduct = (props) => {
    const {
        data,
        ColOnPerRowSmallest = 6,
        ColOnPerRowSmall = 6,
        ColOnPerRowMiddle = 3,
        ColOnPerRowLarge = 3,
        ColOnPerRowExtraLarge = 2,
    } = props;
    const baseData = useRef(data);
    baseData.current = data;
    const [productData, setProductDatas] = useState(data);
    const [product, setProduct] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productPerPgae] = useState(5);
    const [sorted, setSorted] = useState('');
    const [activeLayoutType, setActiveLayoutType] = useState(true);
    const [widthWindow, setWidthWindow] = useState(window.innerWidth);
    const [priceRange, setPriceRange] = useState(40000000);
    const indexOfLastProduct = currentPage * productPerPgae;
    const indexOfFirstProduct = indexOfLastProduct - productPerPgae;
    const currentProduct = product.slice(indexOfFirstProduct, indexOfLastProduct);
    const handlePage = (page) => setCurrentPage(page);

    useEffect(() => {
        setProduct(productData);
    }, [sorted]);
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    //change page
    //sort-data
    const handleSortDesc = () => {
        const dataSorted = [...data].sort((a, b) => (a.price < b.price ? 1 : -1));
        setProductDatas(dataSorted);
        setSorted('desc');
    };

    const handleSortAsc = () => {
        const dataSorted = [...data].sort((a, b) => a.price - b.price);
        setProductDatas(dataSorted);
        setSorted('asc');
    };
    const handleNoSort = () => {
        setProductDatas(baseData.current);
        setSorted('no sort');
    };
    //change layout
    const handleChangeLayout = (num) => {
        num === 1 ? setActiveLayoutType(true) : setActiveLayoutType(false);
    };
    // resize window
    const handleResize = () => {
        setWidthWindow(window.innerWidth);
    };

    const navigate = useNavigate();
    const location = useLocation();
    const pathName = location.pathname;
    const [filter, setFilter] = useState({
        category: '',
        price: '',
        brand: '',
    });

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const category = queryParams.get('category') || '';
        const price = queryParams.get('price') || '';
        const date = queryParams.get('date') || '';

        setFilter({ category, price, date });

        // axios.get(`/api/data?category=${category}&price=${price}&date=${date}`)
        //   .then(response => {
        //     // handle the response data
        //   })
        //   .catch(error => {
        //     // handle the error
        //   });
    }, [location.search]);

    useEffect(() => {
        console.log('history', navigate);
        console.log('location', location);
    });

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     navigate(`${pathName}?category=${filter.category}&price=${filter.price}&date=${filter.brand}`);
    // };

    const handlePriceRange = (e) => {
        setPriceRange(e.target.value);
    };

    return (
        <div className={cx('product-warpper')}>
            <HeaderProduct
                count={productData.length}
                handleSortDesc={handleSortDesc}
                handleSortAsc={handleSortAsc}
                handleNoSort={handleNoSort}
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
                        <p className={cx('price')}>{priceRange}</p>
                        <input type="range" value={priceRange} onInput={handlePriceRange} />
                    </div>

                    <div className={cx('brand-filter')}>
                        <FilterTitle title="THƯƠNG HIỆU" />
                        <div className={cx('filter-wrapper')}>
                            {brands.map((item, index) => (
                                <div className={cx('checkbox')} key={index}>
                                    <input
                                        type="checkbox"
                                        value={item.toLocaleLowerCase()}
                                        onChange={(e) => setFilter({ ...filter, category: e.target.value })}
                                        id={item.toLocaleLowerCase()}
                                    />
                                    <label for={item.toLocaleLowerCase()}>{item}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={cx('reset-btn')}>
                        <FontAwesomeIcon icon={faArrowsRotate} />
                        <p>CHỌN LẠI</p>
                    </div>
                </div>

                <div className={cx('list-product')}>
                    {activeLayoutType ? (
                        <Row>
                            {currentProduct.map((item, index) => (
                                <Col
                                    xs={ColOnPerRowSmallest}
                                    sm={ColOnPerRowSmall}
                                    md={ColOnPerRowMiddle}
                                    lg={ColOnPerRowLarge}
                                    xxl={ColOnPerRowExtraLarge}
                                    className={cx('col-product-item')}
                                >
                                    <div className={cx('product-item')}>
                                        <ProductItem key={index} data={item} />
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <Container>
                            {currentProduct.map((item, index) => (
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
                                                        srcImg={item.image}
                                                        dataHover={widthWindow < 1060 ? `Thêm` : 'Thêm vào giỏ hàng'}
                                                        productId={item.productId}
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
            <CusPagination itemPerPage={productPerPgae} totalItem={data.length} handlePage={handlePage} />
        </div>
    );
};

export default ListProduct;
