import classNames from 'classnames/bind';
import styles from './ImageSlider.module.scss';

import { React, useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
const cx = classNames.bind(styles);

const ImageSlider = ({ images }) => {
    const imgView = useRef();
    const fullImg = useRef();
    const [showSubImg, setShowSubImg] = useState(false);
    const showImg = () => {
        setShowSubImg(true);
        setTimeout(() => {}, 10);
    };

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
                    <SwiperSlide key={index} className={cx('swiper-item')}>
                        <div className={cx('image-wrapper')}>
                            <img ref={imgView} src={image.url} alt={image.alt} onClick={() => showImg()} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            {showSubImg && (
                <div className={cx('sub-image-wrapper')} onClick={() => setShowSubImg(false)}>
                    <img ref={fullImg} className={cx('image')} src={imgView.current.src} alt={imgView.current.alt} />
                </div>
            )}
        </div>
    );
};

export default ImageSlider;
