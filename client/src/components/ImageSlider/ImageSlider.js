import classNames from 'classnames/bind';
import styles from './ImageSlider.module.scss';
import { React, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import { CloseIcon } from '../../Icons/Icons.js';
const cx = classNames.bind(styles);

const ImageSlider = ({ images, subImg = true, className, autoPlay = true, onImageClick }) => {
    const imgView = useRef();
    const fullImg = useRef();
    const [showSubImg, setShowSubImg] = useState(false);
    const [imgURL, setImgURL] = useState('');
    const showImg = (url) => {
        setShowSubImg(true);
        setImgURL(url);
        setTimeout(() => {
            fullImg.current.style.opacity = 1;
        }, 10);
    };

    return (
        <div className={cx('wrapper', className)}>
            <Swiper
                grabCursor={true}
                modules={[FreeMode, Autoplay]}
                className={cx('swiper')}
                snap="true"
                autoplay={autoPlay && { delay: 2500, disableOnInteraction: false }}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    480: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 10,
                    },
                }}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index} className={cx('swiper-item')}>
                        <div className={cx('image-wrapper')}>
                            <img
                                ref={imgView}
                                src={image.url ? image.url : image}
                                alt={image.alt}
                                onClick={() => {
                                    subImg && showImg(image.url);
                                    onImageClick(index);
                                }}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {subImg && showSubImg && (
                <div className={cx('sub-image-container')}>
                    <div className={cx('sub-image-wrapper')}>
                        <CloseIcon className={cx('close-icon')} onClick={() => setShowSubImg(false)} />
                        <img ref={fullImg} className={cx('image')} src={imgURL} alt={imgView.current.alt} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageSlider;
