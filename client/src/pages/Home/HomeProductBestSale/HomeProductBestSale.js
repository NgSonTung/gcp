import classNames from 'classnames/bind';
import styles from './HomeProductBestSale.module.scss';
import ProductBestSale from '~/components/ProductBestSale/index';
import NavTitle from '~/components/NavTitle/index';
import { useState, useEffect } from 'react';
import * as ProductFetch from '~/functions/Fetch';

const cx = classNames.bind(styles);

function HomeProductBestSale(props) {
    const { cate, srcImgBanner } = props;
    const [cateProduct, setCateProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const fetchedResult = await ProductFetch.getProductsByCateName(cate);
        const data = await fetchedResult.data.products.dataProducts;
        await setCateProducts(data);
    };
    const navItems = [
        {
            id: 1,
            title: cate,
            component: (
                <ProductBestSale
                    data={cateProduct}
                    activeTitle={true}
                    title={cate}
                    srcImg={srcImgBanner}
                    banner={true}
                />
            ),
        },
    ];

    return (
        <div className={cx('wrapper-outer')}>
            <NavTitle navItems={navItems} />
        </div>
    );
}

export default HomeProductBestSale;
