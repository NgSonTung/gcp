import classNames from 'classnames/bind';
import styles from './HomeProductBestSale.module.scss';
import ProductBestSale from '~/components/ProductBestSale/index';
import dataBestSale from '~/data/data.json';
import NavTitle from '~/components/NavTitle/index';

const cx = classNames.bind(styles);

function HomeProductBestSale({ cate, srcImgBanner }) {
    const product = dataBestSale.filter((item) => item.category === cate);
    const navItems = [
        {
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
