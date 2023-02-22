import { React, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';

//props: swiperHeight, swiperWidth, itemAspectRatio, images

const ImageSlider = (props) => {
    const showFullScreen = (src) => {
        const fullImg = document.getElementById('FullImg');
        fullImg.src = src;
        document.getElementById('FullImgView').style.display = 'block';
        fullImg.style.transform = 'scale(0.5)'; // initial size
        setTimeout(() => {
            fullImg.style.opacity = 1;
            fullImg.style.transform = 'scale(1)';
        }, 10);
    };
    const hideFullScreen = () => {
        const fullImg = document.getElementById('FullImg');
        document.getElementById('FullImgView').style.display = 'None';
        fullImg.style.opacity = 0;
    };

    const styles = {
        SwiperContainer: {
            height: props.swiperHeight,
            width: props.swiperWidth,
        },
        swiperItem: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        imageWrapper: {
            overflow: 'hidden',
            aspectRatio: props.itemAspectRatio,
        },
        image: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
        },
        FullImgView: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            display: 'None',
            textAlign: 'center',
            zIndex: 1,
        },
        FullImg: {
            padding: 30,
            maxWidth: '95%',
            maxHeight: '95%',
            transition: 'opacity 0.3s ease-in-out',
            transform: 'scale(1)',
            opacity: 0,
        },
    };

    return (
        <div>
            <Swiper
                grabCursor={true}
                modules={[FreeMode, Autoplay]}
                className="mySwiper"
                spaceBetween={30}
                style={styles.SwiperContainer}
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
                {props.images.map((image) => {
                    return (
                        <SwiperSlide style={styles.swiperItem} key={image.id}>
                            <div style={styles.imageWrapper}>
                                <img
                                    src={image.url}
                                    alt={image.alt}
                                    style={styles.image}
                                    onClick={() => showFullScreen(image.url)}
                                />
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
            <div id="FullImgView" style={styles.FullImgView} onClick={() => hideFullScreen()}>
                <img id="FullImg" style={styles.FullImg} />
            </div>
        </div>
    );
};

export default ImageSlider;
