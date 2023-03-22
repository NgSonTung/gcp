import classNames from 'classnames/bind';
import styles from './HomeProductBestSale.module.scss';
import ProductBestSale from '~/components/ProductBestSale/index';
import NavTitle from '~/components/NavTitle/index';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import * as ProductFetch from '~/functions/ProductFetch';
const cx = classNames.bind(styles);

function HomeProductBestSale(props) {
    const [products, setProducts] = useState([]);
    const { cate, srcImgBanner } = props;

    useEffect(() => {
        getData();
        console.log(products);
    }, []);

    const navItems = [
        {
            id: 1,
            title: cate,
            component: (
                <ProductBestSale
                    data={products}
                    activeTitle={true}
                    title={products?.category}
                    srcImg={srcImgBanner}
                    banner={true}
                />
            ),
        },
    ];
    const getData = async () => {
        const data = await ProductFetch.getAllProducts('');
        const result = data?.data?.products;

        setProducts(result);
    };

    return (
        <div className={cx('wrapper-outer')}>
            <NavTitle navItems={navItems} />
        </div>
    );
}

export default HomeProductBestSale;
