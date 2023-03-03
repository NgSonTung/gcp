import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ProductMagnifier.module.scss';
import ImageMagnify from 'react-image-magnify';
import ImageSlider from '../ImageSlider';

const cx = classNames.bind(styles);

function ProductMagnifier({ product }) {
    let imageList = [product?.image];
    imageList = imageList.concat(product?.sub_image?.map((image) => image));

    const [activeImage, setActiveImage] = useState(0);
    console.log(activeImage);
    return (
        <div>
            <div className={cx('product-image-container')}>
                <ImageMagnify
                    className={cx('product-image-wrapper')}
                    imageStyle={{
                        padding: '1rem',
                        objectFit: 'contain',
                    }}
                    isHintEnabled={false}
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
                        overlayStyle: { backgroundColor: 'rgba(0,0,0,.6)' },
                        enlargedImageContainerStyle: {
                            zIndex: 999,
                        },
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
