import classNames from 'classnames/bind';
import styles from './ProductBestSale.module.scss';
import ProductItem from '../ProductItem/index';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const ProductBestSale = (props) => {
    const { data, title, srcImg, banner = false, activeTitle = false } = props;
    return (
        <div className={cx('wrapper')}>
            {/* link den cac san pham la dien thoai */}
            {activeTitle && (
                <Link to={'/product/phone'}>
                    {/* <div className={cx('wrapper-title')}>
                        <span>{title}</span>
                    </div> */}
                </Link>
            )}
            <div className={banner ? cx('wrapper-img', 'active-banner') : cx('wrapper-img')}>
                <img src={srcImg} className={cx('wrapper-pic')} alt="anh tet" />
            </div>
            <div className={cx('wrapper-item')}>
                <div className={cx('wrapper-product')}>
                    <Swiper // khung
                        grabCursor={true}
                        modules={[FreeMode, Autoplay]}
                        className={cx('swiper')}
                        snap="true"
                        // autoplay={{ delay: 2500, disableOnInteraction: false }}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                                spaceBetween: 15,
                            },
                            480: {
                                slidesPerView: 2,
                                spaceBetween: 10,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 15,
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 15,
                            },
                        }}
                    >
                        {data.map((item, index) => (
                            <SwiperSlide //khung nho hon chua item
                                key={index}
                                className={cx('swiper-item')}
                            >
                                <ProductItem key={index} data={item} hotTag={true} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};
export default ProductBestSale;
