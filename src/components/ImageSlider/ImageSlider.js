import classNames from 'classnames/bind';
import styles from './ImageSlider.module.scss';

import { React, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
const cx = classNames.bind(styles);

const ImageSlider = ({ images }) => {
    return (
        <div className={cx('wrapper')}>
            <Swiper
                grabCursor={true}
                modules={[FreeMode, Autoplay]}
                className={cx('swiper')}
                snap="true"
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    480: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 15,
                    },
                }}
            >
                {images.map((image, index) => (
                    <SwiperSlide className={cx('swiper-item')}>
                        <div className={cx('image-wrapper')}>
                            <img src={image.url} alt={image.alt} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className={cx('sub-image-wrapper')}>
                <img className={cx('image')} />
            </div>
        </div>
    );
};

export default ImageSlider;
