import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './ListProduct.module.scss';
import ProductItem from '~/components/ProductItem';
import CusPagination from '~/components/CusPagination/index';
const cx = classNames.bind(style);
export const ListProduct = ({ data }) => {
    const [product, setProduct] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productPerPgae, setProductPerPgae] = useState(5);
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
                {currentProduct.map((item, index) => (
                    <div className={cx('product-item')}>
                        <ProductItem key={index} data={item} />
                    </div>
                ))}
            </div>
            <CusPagination itemPerPage={productPerPgae} totalItem={data.length} handlePage={handlePage} />
        </div>
    );
};

export default ListProduct;
