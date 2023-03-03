import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import style from './ListProduct.module.scss';
import ProductItem from '~/components/ProductItem/index';
import CusPagination from '~/components/CusPagination/index';
import { Row, Col, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import HeaderProduct from './HeaderProduct/index';
import BuyButton from '~/components/ListProduct/BuyButton/index';
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

    useEffect(() => {
        setProduct(productData);
    }, [sorted]);
    const indexOfLastProduct = currentPage * productPerPgae;
    const indexOfFirstProduct = indexOfLastProduct - productPerPgae;
    const currentProduct = product.slice(indexOfFirstProduct, indexOfLastProduct);
    //change page
    const handlePage = (page) => setCurrentPage(page);
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
        console.log(baseData.current);
    };
    //change layout
    const handleChangeLayout = (num) => {
        num === 1 ? setActiveLayoutType(true) : setActiveLayoutType(false);
        console.log(activeLayoutType);
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
                                            <div className={cx('buy-button')}>
                                                <BuyButton srcImg={item.image} dataHover={'Mua Ngay'} />
                                            </div>
                                        </Col>
                                    </div>
                                </Col>
                            </Row>
                        ))}
                    </Container>
                )}
            </div>
            <CusPagination itemPerPage={productPerPgae} totalItem={data.length} handlePage={handlePage} />
        </div>
    );
};

export default ListProduct;
