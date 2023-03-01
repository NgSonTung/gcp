import React from 'react';
import classNames from 'classnames/bind';
import styles from './ProductMagnifier.module.scss';
import ImageMagnify from 'react-image-magnify';

const cx = classNames.bind(styles);

function ProductMagnifier(props) {
    return (
        <div className={cx('product-image-container')}>
            <ImageMagnify
                className={cx('product-image-wrapper')}
                imageStyle={{
                    objectFit: 'contain',
                }}
                isHintEnabled={false}
                {...{
                    smallImage: {
                        alt: 'product-image',
                        isFluidWidth: true,
                        src: props.product?.image,
                    },
                    largeImage: {
                        src: props.product?.image,
                        width: 700,
                        height: 700,
                    },
                    overlayStyle: { backgroundColor: 'rgba(0,0,0,.6)' },
                    enlargedImageContainerStyle: {
                        zIndex: 999,
                    },
                }}
            />
        </div>
    );
}

export default ProductMagnifier;
