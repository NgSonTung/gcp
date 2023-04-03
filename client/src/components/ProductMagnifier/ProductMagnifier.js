import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './ProductMagnifier.module.scss';
import ImageMagnify from 'react-image-magnify';
import ImageSlider from '../ImageSlider';
import { getURLImage } from '~/functions/SubImgFetch';
const cx = classNames.bind(styles);

function ProductMagnifier({ type, product, subImg = [] }) {
    const [listSrc, setListSrc] = useState(null);

    useEffect(() => {
        let imageList = [product?.image];
        subImg?.forEach((obj) => {
            imageList.push(obj.image);
        });
        //cach dung fetch img
        getURLImage(imageList, type).then((result) => setListSrc(result));
        setActiveImage(0);
    }, [product]);

    const [activeImage, setActiveImage] = useState(0);

    return (
        <div>
            <div className={cx('product-image-container')}>
                {listSrc && (
                    <ImageMagnify
                        className={cx('product-image-wrapper')}
                        imageClassName={cx('product-image')}
                        {...{
                            smallImage: {
                                alt: 'product-image',
                                isFluidWidth: true,
                                src: listSrc[activeImage],
                            },
                            largeImage: {
                                src: listSrc[activeImage],
                                width: 1000,
                                height: 1000,
                            },
                            enlargedImageContainerStyle: {
                                zIndex: 999,
                            },
                            lensStyle: {
                                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                                border: '1px solid #ccc',
                            },
                            isHintEnabled: true,
                            shouldUsePositiveSpaceLens: true,
                        }}
                    />
                )}
            </div>
            <ImageSlider
                onImageClick={(index) => setActiveImage(index)}
                className={cx('sub-img-container')}
                images={listSrc}
                subImg={false}
                autoPlay={false}
            />
        </div>
    );
}

export default ProductMagnifier;
