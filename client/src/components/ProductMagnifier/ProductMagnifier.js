import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './ProductMagnifier.module.scss';
import ImageMagnify from 'react-image-magnify';
import ImageSlider from '../ImageSlider';
import { getFileImage } from '~/functions/SubImgFetch';
const cx = classNames.bind(styles);

function ProductMagnifier({ type, product, subImg = [] }) {
    const [listSrc, setListSrc] = useState([]);
    async function getImage(list) {
        let listImageSrc = [];
        for (let element of list) {
            const response = await getFileImage(element);
            const blob = new Blob([response.data], { type: 'image/jpg' });
            const blobUrl = URL.createObjectURL(blob);
            listImageSrc.push(blobUrl);
        }
        if (type === 'admin')
            listImageSrc.push(
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRal66RNJGRaNvsBcwWGY8S9rZO5UPXXpAEwg&usqp=CAU',
            );

        setListSrc(listImageSrc);
    }

    useEffect(() => {
        let imageList = [product?.image];
        subImg?.map((obj) => imageList.push(obj.image));
        getImage(imageList);
        setActiveImage(0);
    }, [product]);

    // useEffect(() => {
    //     let imageList = [product?.image];
    //     subImg?.map((obj) => imageList.push(obj.image));
    // }, [product]);

    const [activeImage, setActiveImage] = useState(0);

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
