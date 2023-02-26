import classNames from 'classnames/bind';
import styles from './ProductSingleModal.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function ProductSingleModal() {
    const { nameproduct } = useParams();
    const { product } = useSelector((state) => state.ProductReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'PRODUCT', nameproduct });
        console.log(product);
    }, [nameproduct]);

    return <div>{product?.name}</div>;
}

export default ProductSingleModal;
