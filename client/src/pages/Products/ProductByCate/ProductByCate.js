import { useEffect } from 'react';
import { useState } from 'react';
import ListProduct from '../../../components/ListProduct/index';
import { useParams } from 'react-router-dom';
import * as ProductFetch from '~/functions/ProductFetch';
import classNames from 'classnames/bind';
import style from './ProductByCate.module.scss';
const cx = classNames.bind(style);

function ProductByCate() {
    const { categoryName } = useParams();
    console.log(categoryName);
    const [products, setProducts] = useState([]);

    // const getProductsByCate = () => {
    //     urlGetAPI = 'product/?page=1&pageSize=10';
    // };

    useEffect(() => {
        console.log('vcl', categoryName);
        console.log('vcl');
    });

    return (
        <div className={cx('wrapper')}>
            <ListProduct
                categoryName={categoryName}
                ColOnPerRowSmallest={12}
                ColOnPerRowSmall={12}
                ColOnPerRowMiddle={4}
                ColOnPerRowLarge={3}
                ColOnPerRowExtraLarge={2}
            />
        </div>
    );
}

export default ProductByCate;
