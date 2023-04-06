import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './ProductMagnifier.module.scss';
import ImageMagnify from 'react-image-magnify';
import ImageSlider from '../ImageSlider';
import { getURLSubImage } from '~/functions/SubImgFetch';
import { getURLProductImage } from '~/functions/ProductFetch';

const cx = classNames.bind(styles);

function ProductMagnifier({ type = 'default', product, subImg = [] }) {
    const [listSrc, setListSrc] = useState([]);
    const fetchImage = async () => {
        let listResult = [];
        await getURLProductImage([product?.image], type).then((result) => (listResult = [...listResult, ...result]));
        let subImageList = [];
        subImg?.forEach((obj) => {
            subImageList.push(obj.image);
        });
        //cach dung fetch img
        await getURLSubImage(subImageList, type).then((result) => (listResult = [...listResult, ...result]));
        setListSrc([...listResult]);
    };
    useEffect(() => {
        fetchImage();
        setActiveImage(0);
    }, [product]);
    const [activeImage, setActiveImage] = useState(0);

    return (
        <div>
            <div className={cx('product-image-container')}>
                {listSrc.length > 0 && type !== 'admin' ? (
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
                ) : (
                    <img className={cx('product-image-wrapper')} src={listSrc && listSrc[0]} />
                )}
            </div>
            <ImageSlider
                productID={product.productID}
                admin={type}
                onImageClick={(index) => setActiveImage(index)}
                className={cx('sub-img-container')}
                images={listSrc && type === 'admin' ? listSrc.slice(1) : listSrc}
                subImg={false}
                autoPlay={false}
            />
        </div>
    );
}

export default ProductMagnifier;
