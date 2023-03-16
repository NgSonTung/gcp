import React, { useEffect, useState } from 'react';
import ListProduct from '../../../components/ListProduct/index';
import DataProduct from '~/data/products';
import classNames from 'classnames/bind';
import style from './AllProducts.module.scss';
import { getAllProducts } from '~/functions/Fetch';
const cx = classNames.bind(style);
export const AllProducts = () => {
    return (
        <div className={cx('wrapper')}>
            <ListProduct
                ColOnPerRowSmallest={6}
                ColOnPerRowSmall={6}
                ColOnPerRowMiddle={4}
                ColOnPerRowLarge={3}
                ColOnPerRowExtraLarge={2}
            />
        </div>
    );
};

export default AllProducts;
