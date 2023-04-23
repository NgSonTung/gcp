import React, { useEffect, useState } from 'react';
import styles from './ProductRating.module.scss';
import classNames from 'classnames/bind';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as RatingFetch from '~/functions/RatingFetch';

const cx = classNames.bind(styles);
console.log('hello');
function ProductRating({ productID }) {
    const [ratings, setRatings] = useState();
    const [hoveredStars, setHoveredStars] = useState(0);
    const [averageRating, setAverageRating] = useState(0);
    const [fullStars, setFullStars] = useState(0);
    const [halfStars, setHalfStars] = useState(0);
    const [emptyStars, setEmptyStars] = useState(0);
    const totalRatings = ratings?._5star + ratings?._4star + ratings?._3star + ratings?._2star + ratings?._1star;

    useEffect(() => {
        if (totalRatings !== 0 && !isNaN(totalRatings)) {
            console.log('cc1');
            setAverageRating(
                (5 * ratings?._5star +
                    4 * ratings?._4star +
                    3 * ratings?._3star +
                    2 * ratings?._2star +
                    1 * ratings?._1star) /
                    totalRatings,
            );
        } else {
            console.log('cc2');

            setAverageRating(0);
        }
    }, [ratings]);
    useEffect(() => {
        console.log('changed');
        const full = Math.floor(averageRating);
        const half = Math.round(averageRating === 0 ? 0 : averageRating - full);
        const empty = 5 - full - half;
        setFullStars(full);
        setHalfStars(half);
        setEmptyStars(empty);
    }, [averageRating]);

    const handleStarHover = (starCount) => {
        setHoveredStars(starCount);
    };

    useEffect(() => {
        getProductRating();
        // console.log(ratings);
        // console.log(totalRatings);
        // console.log(averageRating);
        // console.log(fullStars);
        // console.log(halfStars);
        // console.log(
        //     [...Array(0)].map((i) => {
        //         console.log(i);
        //     }),
        // );
    }, [productID]);

    const getProductRating = async () => {
        const result = await RatingFetch.getRatingByProductId(productID);
        const fetchedRatings = await result?.data?.rating;
        setRatings(fetchedRatings);
    };

    const handleStarClick = (starCount) => {
        toast.success(`Đã đánh giá ${starCount} sao!`, {
            position: 'top-center',
            autoClose: 2001,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });

        //update db
        const ratingUpdateInfo = {
            productID: productID,
            rating: starCount,
        };
        handleRatingProduct(ratingUpdateInfo);
    };

    const handleRatingProduct = async (updateInfo) => {
        await RatingFetch.ratingProduct(updateInfo);
        await getProductRating();
        console.log(ratings);
    };

    return (
        <div className={cx('rating')}>
            <ToastContainer style={{ zIndex: 1 }} />
            {/* {console.log([...Array(0)])} */}
            {fullStars !== 0 &&
                [...Array(fullStars)]?.map((_, i) => {
                    return (
                        <FontAwesomeIcon
                            key={`star-${i}`}
                            className={cx('full-star', { highlighted: i + 1 <= hoveredStars })}
                            icon={faStar}
                            onMouseEnter={() => handleStarHover(i + 1)}
                            onMouseLeave={() => handleStarHover(0)}
                            onClick={() => handleStarClick(i + 1)}
                        />
                    );
                })}
            {halfStars !== 0 &&
                [...Array(halfStars)]?.map((_, i) => {
                    return (
                        <div
                            className={cx('half-star-wrapper')}
                            onMouseEnter={() => handleStarHover(fullStars + i + 1)}
                            onMouseLeave={() => handleStarHover(0)}
                            onClick={() => handleStarClick(fullStars + i + 1)}
                            key={`half-star-${i}`}
                        >
                            <FontAwesomeIcon className={cx('half-star')} icon={faStarHalf} />
                            <FontAwesomeIcon
                                className={cx('half-star-background', {
                                    halfhighlighted: i + fullStars + 1 <= hoveredStars,
                                })}
                                icon={faStar}
                            />
                        </div>
                    );
                })}
            {emptyStars !== 0 &&
                [...Array(emptyStars)]?.map((_, i) => (
                    <FontAwesomeIcon
                        key={`empty-star${i}`}
                        className={cx('no-star', { highlighted: i + fullStars + halfStars + 1 <= hoveredStars })}
                        icon={faStar}
                        onMouseEnter={() => handleStarHover(fullStars + halfStars + i + 1)}
                        onMouseLeave={() => handleStarHover(0)}
                        onClick={() => handleStarClick(fullStars + halfStars + i + 1)}
                    />
                ))}
            <span className={cx('total-ratings')}>({totalRatings ? totalRatings : 0})</span>
        </div>
    );
}

export default ProductRating;
