import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './ProductMagnifier.module.scss';
import ImageMagnify from 'react-image-magnify';
import ImageSlider from '../ImageSlider';

const cx = classNames.bind(styles);

function ProductMagnifier({ product, subImg = [] }) {
    let imageList = [product?.image];
    subImg?.map((obj) => imageList.push(obj.url));
    // imageList = imageList.concat(product?.sub_image?.map((image) => image));

    const [activeImage, setActiveImage] = useState(0);
    useEffect(() => {
        setActiveImage(0);
    }, [product]);

    return (
        <div>
            <div className={cx('product-image-container')}>
                <ImageMagnify
                    className={cx('product-image-wrapper')}
                    imageClassName={cx('product-image')}
                    {...{
                        smallImage: {
                            alt: 'product-image',
                            isFluidWidth: true,
                            src: imageList[activeImage],
                        },
                        largeImage: {
                            src: imageList[activeImage],
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
            </div>
            <ImageSlider
                onImageClick={(index) => setActiveImage(index)}
                className={cx('sub-img-container')}
                images={imageList}
                subImg={false}
                autoPlay={false}
            />
        </div>
    );
}

export default ProductMagnifier;
