import classNames from 'classnames/bind';
import styles from './LinkItem.module.scss';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import HandleForm from '../HandleForm/HandleForm';
import ProductMagnifier from '~/components/ProductMagnifier';
import ProductDetailDesc from '~/components/ProductDetailDesc';
import { getSubImgByProduct } from '~/functions/SubImgFetch';
import { getFeatureByProductID } from '~/functions/FeatureFetch';
import { getRatingByProductId } from '~/functions/RatingFetch';

const cx = classNames.bind(styles);

const formatCurrency = (str) => {
    const regex = /\d{1,3}(?=(\d{3})+(?!\d))/g;
    return `${str.toString().replace(regex, '$&,')}₫`;
};

const LinkItem = ({ brands, categories, object, HandleAddDelete, checked, jwt, data, setDataChange }) => {
    const [showEditForm, setShowEditForm] = useState(false);
    const [isChecked, setIsChecked] = useState(checked);
    const inputRef = useRef();
    const [fullProductData, setFullProductData] = useState();
    const [productData, setProductData] = useState();
    useEffect(() => {
        console.log(fullProductData);
    }, [fullProductData]);
    const HandleSetProductData = () => {
        !productData ? setProductData(data) : setProductData();
    };
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

    const getBrandNameById = (brandID) => {
        const brand = brands?.find((brand) => brand.brandID === brandID);
        return brand ? brand.brandName : null;
    };

    const handleShowEditForm = () => {
        setShowEditForm(true);
    };
    const HandleCheck = () => {
        setIsChecked(!isChecked);
    };
    useEffect(() => {
        setIsChecked(checked);
    }, [checked]);
    useEffect(() => {
        HandleAddDelete(data.productID, isChecked);
        HandleAddDelete(data.userID, isChecked);
    }, [isChecked]);
    return (
        <div className={cx('container')}>
            <div className={cx('link-info-wrapper')}>
                {object === 'product' ? (
                    <div className={cx('link-item')} onClick={HandleSetProductData}>
                        <div className={cx('description')}>
                            <input
                                className={cx('input-checked')}
                                checked={isChecked}
                                ref={inputRef}
                                onClick={HandleCheck}
                                type="checkbox"
                                readOnly
                            />
                            <p className={cx('text')}>{data?.productID}</p>
                        </div>
                        <p className={cx('old_link')}>{data?.name}</p>
                        <p className={cx('old_link')}>{getBrandNameById(data?.brandID)}</p>
                        <p className={cx('new_link')}>{data && formatCurrency(data?.price)}</p>
                    </div>
                ) : (
                    <div className={cx('link-item', { admin: data.auth === 1 })}>
                        <div className={cx('description')}>
                            <input
                                className={cx('input-checked')}
                                checked={isChecked}
                                ref={inputRef}
                                onClick={HandleCheck}
                                type="checkbox"
                                readOnly
                            />
                            <p className={cx('text')}>{data?.userID}</p>
                        </div>
                        <p className={cx('old_link')}>{data?.userName}</p>
                        <p className={cx('old_link')}>{data?.email}</p>
                        <p className={cx('new_link')}>{data?.auth === 1 ? 'admin' : 'user'}</p>
                    </div>
                )}
                <div className={cx('link-handle-wrapper')}>
                    <button className={cx('handle-link-btn')} onClick={handleShowEditForm}>
                        <FontAwesomeIcon className={cx('btn-icon')} icon={faEllipsis} />
                    </button>
                </div>
                {showEditForm && (
                    <HandleForm
                        jwt={jwt}
                        setDataChange={setDataChange}
                        setShowEditForm={setShowEditForm}
                        data={data}
                        formType={'UpdateRemove'}
                        object={object}
                    />
                )}
            </div>
            <div className={cx('product-detail-container')}>
                {fullProductData?.productData && productData && (
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

export default LinkItem;
