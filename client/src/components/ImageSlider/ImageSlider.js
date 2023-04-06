import classNames from 'classnames/bind';
import styles from './ImageSlider.module.scss';
import { React, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import { CloseIcon } from '../../Icons/Icons.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const ImageSlider = ({
    admin = 'false',
    images,
    subImg = true,
    className,
    autoPlay = true,
    onImageClick,
    type = 'product',
}) => {
    const imgView = useRef();
    const fullImg = useRef();
    const [showSubImg, setShowSubImg] = useState(false);
    const [imgURL, setImgURL] = useState('');
    const [hoveredIndex, setHoveredIndex] = useState(-1);

    const handleHover = (id) => {
        admin === 'admin' && setHoveredIndex(id);
    };
    const handleUnhover = () => {
        admin === 'admin' && setHoveredIndex(-1);
    };
    const showImg = (url) => {
        setShowSubImg(true);
        setImgURL(url);
        setTimeout(() => {
            fullImg.current.style.opacity = 1;
        }, 10);
    };
    const HandleClick = (id, image) => {
        subImg && showImg(image?.url ? image.url : image);
        type === 'product' && onImageClick(id);
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
                {images?.map((image, index) => (
                    <SwiperSlide key={index} className={cx('swiper-item')}>
                        <div
                            className={cx('image-wrapper')}
                            onMouseEnter={() => handleHover(index)}
                            onMouseLeave={handleUnhover}
                        >
                            {hoveredIndex !== index ? (
                                <img
                                    ref={imgView}
                                    src={image?.url ? image.url : image}
                                    alt={image?.alt}
                                    onClick={() => HandleClick(index, image)}
                                />
                            ) : (
                                <FontAwesomeIcon className={cx('icon')} icon={faTrash} />
                            )}
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
