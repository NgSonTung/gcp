import React, { useState } from 'react';
import styles from './ProductRating.module.scss';
import classNames from 'classnames/bind';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);

function ProductRating({ ratings }) {
    const [hoveredStars, setHoveredStars] = useState(0);

    const totalRatings = ratings._5star + ratings._4star + ratings._3star + ratings._2star + ratings._1star;
    const averageRating =
        (5 * ratings._5star + 4 * ratings._4star + 3 * ratings._3star + 2 * ratings._2star + 1 * ratings._1star) /
        totalRatings;
    const fullStars = Math.floor(averageRating);
    const halfStars = Math.round(averageRating - fullStars);
    const emptyStars = 5 - fullStars - halfStars;

    const handleStarHover = (starCount) => {
        setHoveredStars(starCount);
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
    };

    return (
        <div className={cx('rating')}>
            <ToastContainer style={{ zIndex: 1 }} />
            {[...Array(fullStars)].map((_, i) => (
                <FontAwesomeIcon
                    key={`star-${i}`}
                    className={cx('full-star', { highlighted: i + 1 <= hoveredStars })}
                    icon={faStar}
                    onMouseEnter={() => handleStarHover(i + 1)}
                    onMouseLeave={() => handleStarHover(0)}
                    onClick={() => handleStarClick(i + 1)}
                />
            ))}
            {[...Array(halfStars)].map((_, i) => (
                <div
                    className={cx('half-star-wrapper')}
                    onMouseEnter={() => handleStarHover(fullStars + i + 1)}
                    onMouseLeave={() => handleStarHover(0)}
                    onClick={() => handleStarClick(fullStars + i + 1)}
                    key={`half-star-${i}`}
                >
                    <FontAwesomeIcon className={cx('half-star')} icon={faStarHalf} />
                    <FontAwesomeIcon
                        className={cx('half-star-background', { halfhighlighted: i + fullStars + 1 <= hoveredStars })}
                        icon={faStar}
                    />
                </div>
            ))}
            {[...Array(emptyStars)].map((_, i) => (
                <FontAwesomeIcon
                    key={`empty-star${i}`}
                    className={cx('no-star', { highlighted: i + fullStars + halfStars + 1 <= hoveredStars })}
                    icon={faStar}
                    onMouseEnter={() => handleStarHover(fullStars + halfStars + i + 1)}
                    onMouseLeave={() => handleStarHover(0)}
                    onClick={() => handleStarClick(fullStars + halfStars + i + 1)}
                />
            ))}
            <span className={cx('total-ratings')}>({totalRatings})</span>
        </div>
    );
}

export default ProductRating;
