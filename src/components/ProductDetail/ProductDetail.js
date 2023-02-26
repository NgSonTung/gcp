import classNames from 'classnames/bind';
import styles from './ProductDetail.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import ProductSingleModal from '../ProductSingleModal/ProductSingleModal';

const cx = classNames.bind(styles);

function ProductDetail() {
    const { nameproduct } = useParams();

    useEffect(() => {
        // console.log(nameproduct);
    });

    return (
        <div>
            <ProductSingleModal />
        </div>
    );
}

export default ProductDetail;
