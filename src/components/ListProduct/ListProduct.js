import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './ListProduct.module.scss';
import ProductItem from '~/components/ProductItem/index';
import CusPagination from '~/components/CusPagination/index';
import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
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
    const [product, setProduct] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productPerPgae] = useState(5);
    useEffect(() => {
        setProduct(data);
    }, []);

    const indexOfLastProduct = currentPage * productPerPgae;
    const indexOfFirstProduct = indexOfLastProduct - productPerPgae;
    const currentProduct = product.slice(indexOfFirstProduct, indexOfLastProduct);
    //change page
    const handlePage = (page) => setCurrentPage(page);
    return (
        <div className={cx('product-warpper')}>
            <div className={cx('list-product')}>
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
            </div>
            <CusPagination itemPerPage={productPerPgae} totalItem={data.length} handlePage={handlePage} />
        </div>
    );
};

export default ListProduct;
