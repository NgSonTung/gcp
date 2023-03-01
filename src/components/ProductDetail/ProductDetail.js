import classNames from 'classnames/bind';
import styles from './ProductDetail.module.scss';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ProductMagnifier from '../ProductMagnifier';
import ProductDetailDesc from '../ProductDetailDesc';

const cx = classNames.bind(styles);

function ProductDetail() {
    const [productLoaded, setProductLoaded] = useState(false);
    const { nameproduct } = useParams();
    const { product } = useSelector((state) => state.ProductReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: 'PRODUCT', nameproduct });
        setProductLoaded(true);
    }, [nameproduct]);

    return (
        <div>
            {productLoaded && (
                <div className={cx('main-detail-wrapper')}>
                    <div className={cx('product-image')}>
                        <ProductMagnifier product={product} />
                    </div>
                    <div className={cx('product-detail')}>
                        <ProductDetailDesc product={product} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductDetail;
