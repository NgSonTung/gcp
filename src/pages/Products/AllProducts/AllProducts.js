import React, { useEffect, useState } from 'react';
import ListProduct from '../../../components/ListProduct/index';
import DataProduct from '~/data/products';
import classNames from 'classnames/bind';
import style from './AllProducts.module.scss';
import { getAllProducts } from '~/functions/Fetch';
import { useParams } from 'react-router-dom';
const cx = classNames.bind(style);
export const AllProducts = () => {
    const { categoryName } = useParams();

    useEffect(() => {
        console.log(categoryName);
    });

    return (
        <div className={cx('wrapper')}>
            <ListProduct
                ColOnPerRowSmallest={12}
                ColOnPerRowSmall={12}
                ColOnPerRowMiddle={4}
                ColOnPerRowLarge={3}
                ColOnPerRowExtraLarge={2}
            />
        </div>
    );
};

export default AllProducts;
