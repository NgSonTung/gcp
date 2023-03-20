import classNames from 'classnames/bind';
import styles from './HomeProductBestSale.module.scss';
import ProductBestSale from '~/components/ProductBestSale/index';
import NavTitle from '~/components/NavTitle/index';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function HomeProductBestSale(props) {
    const { cate, srcImgBanner } = props;
    const data = useSelector((state) => state.ProductReducer);
    console.log(data);
    const product = data.product.filter((item) => item.category === cate);
    const navItems = [
        {
            id: 1,
            title: cate,
            component: (
                <ProductBestSale
                    data={product}
                    activeTitle={true}
                    title={product?.category}
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
