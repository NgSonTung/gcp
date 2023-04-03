import classNames from 'classnames/bind';
import styles from './LinkPaginate.module.scss';
import CateTitle from '../CateTitle/CateTitle';
import LinkItem from '../LinkItem/LinkItem';
import ProductMagnifier from '~/components/ProductMagnifier';
import ProductDetailDesc from '~/components/ProductDetailDesc';
import { getSubImgByProduct } from '~/functions/SubImgFetch';
import { getFeatureByProductID } from '~/functions/FeatureFetch';
import { getRatingByProductId } from '~/functions/RatingFetch';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

const LinkPaginate = ({
    brands,
    categories,
    object,
    HandleAddDelete,
    handleCheckAll,
    allChecked,
    jwt,
    data,
    setDataChange,
}) => {
    const [fullProductData, setFullProductData] = useState();
    const [productData, setProductData] = useState();
    useEffect(() => {
        console.log(fullProductData);
    }, [fullProductData]);
    const handleGetData = async () => {
        if (productData) {
            // console.log('productData', productData);
            const fetchSubImg = await getSubImgByProduct(productData.productID);
            // setTotalProduct(fetchedData?.data?.products?.totalProduct);
            const fetchFeature = await getFeatureByProductID(productData.productID);
            const fetchRating = await getRatingByProductId(productData.productID);
            setFullProductData({
                productData: productData,
                subImg: fetchSubImg,
                feature: fetchFeature,
                rating: fetchRating.data.rating,
            });
        }
    };
    useEffect(() => {
        handleGetData();
    }, [productData]);

    return (
        <div>
            <div className={cx('wrapper')}>
                <CateTitle object={object} checked={allChecked} handleCheckAll={handleCheckAll} />
                <div className={cx('link-item-wrapper')}>
                    {data?.data?.map((item, index) => (
                        <div key={index}>
                            <LinkItem
                                setProductData={setProductData}
                                brands={brands}
                                categories={categories}
                                object={data.object}
                                HandleAddDelete={HandleAddDelete}
                                checked={allChecked}
                                jwt={jwt}
                                data={item}
                                setDataChange={setDataChange}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className={cx('product-detail-container')}>
                {fullProductData?.productData && (
                    <div>
                        <div className={cx('main-detail-wrapper')}>
                            <div className={cx('product-image')}>
                                <ProductMagnifier
                                    type={'admin'}
                                    product={fullProductData?.productData}
                                    subImg={fullProductData?.subImg}
                                />
                            </div>
                            <div className={cx('product-detail')}>
                                <ProductDetailDesc
                                    type={'admin'}
                                    // full={false}
                                    brands={brands}
                                    categories={categories}
                                    product={fullProductData?.productData}
                                    feature={fullProductData?.feature}
                                    rating={fullProductData?.rating}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LinkPaginate;
