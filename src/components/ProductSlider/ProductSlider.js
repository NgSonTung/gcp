import classNames from 'classnames/bind';
import styles from './ProductSlider.module.scss';
import React, { useRef } from 'react';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import ProductDisplay from '~/components/ProductDisplay/ProductDisplay';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const ProductSlider = (props) => {
    const swiperRef = useRef();

    const nextSlide = () => {
        swiperRef.current.swiper.slideNext();
    };
    const prevSlide = () => {
        swiperRef.current.swiper.slidePrev();
    };

    const slides = [];
    for (let i = 0; i < props.data.length; i += 3) {
        const slideData = props.data.slice(i, i + 3);
        const slideComponents = slideData.map((item, id) => (
            <Link to={`/product/${item.name}`}>
                <div key={id} className={cx('product', { middle: id % 2 !== 0 })}>
                    <ProductDisplay newProduct={item} />
                </div>
            </Link>
        ));
        console.log(slideComponents);
        const slide = (
            <SwiperSlide key={i}>
                <div className={cx('slide-item')}>{slideComponents}</div>
            </SwiperSlide>
        );
        slides.push(slide);
    }
    console.log(slides);
    return (
        <Swiper
            ref={swiperRef}
            className={cx('swiper-container')}
            slidesPerView="3"
            spaceBetween={10}
            observer={true}
            observeParents={true}
            parallax={true}
            breakpoints={{
                0: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                },
            }}
            allowSlideNext={true}
            allowSlidePrev={true}
        >
            {slides}
            <div className={cx('swiper-button-prev')} onClick={() => prevSlide()}>
                <p className={cx('prev-text')}>&#60;</p>
            </div>
            <div className={cx('swiper-button-next')} onClick={() => nextSlide()}>
                <p className={cx('next-text')}>&#62;</p>
            </div>
        </Swiper>
    );
};

export default ProductSlider;
