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
import { postUrlFileImage } from '~/functions/Upload';

const cx = classNames.bind(styles);

const ImageSlider = ({
    productID = '',
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
        admin === 'admin' && id !== 0 && setHoveredIndex(id);
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
    const HandleUploadSubImg = async (image, productID, alt) => {
        const fileBlob = new Blob([image]);
        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);
        reader.onloadend = async () => {
            await postUrlFileImage(reader.result.split(',')[1], 'subImgimages', image.name, productID, alt);
        };
    };
    const HandleClick = (id, image) => {
        if (admin === 'admin') {
            if (id === 0) {
                // Create an input element for selecting a file
                const fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.accept = 'image/*';
                fileInput.style.display = 'none';
                // Attach a change event listener to the file input to save the selected file
                fileInput.addEventListener('change', () => {
                    const img = fileInput.files[0];
                    HandleUploadSubImg(img, productID, `subImg${productID}`);
                });
                // Trigger the file input click event when the first div is clicked

                fileInput.click();
            }
        }
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
