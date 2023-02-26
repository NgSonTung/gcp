import classNames from 'classnames/bind';
import styles from './SliderBanner.module.scss';
import { sliderBannerImgs } from '~/data';
import { useEffect, useState } from 'react';
import { NextIcon, PreviousIcon } from '~/Icons';

const cx = classNames.bind(styles);

function SliderBanner() {
    const [sliderData, setSliderData] = useState(sliderBannerImgs);
    const [currentIndex, setCurrentIndex] = useState(2);
    const [pageSize, setPageSize] = useState(1);

    const lastIdx = currentIndex * pageSize;
    const firstIdx = lastIdx - pageSize;
    const slider = sliderData.slice(firstIdx, lastIdx);

    // useEffect(() => console.log(sliderData));

    const paginate = (num) => {
        setCurrentIndex(num);
        if (num <= 0) {
            setCurrentIndex(sliderData.length);
        }
        if (num > sliderData.length) {
            setCurrentIndex(1);
        }
    };

    useEffect(() => {
        const autoId = setTimeout(() => {
            setCurrentIndex((prev) => prev + 1);
            if (currentIndex <= 0) {
                setCurrentIndex(sliderData.length);
            }
            if (currentIndex >= sliderData.length) {
                setCurrentIndex(1);
            }
        }, 2000);

        return () => clearTimeout(autoId);
    }, [currentIndex]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('slider-container')}>
                <div className={cx('slider-img')}>
                    {slider.map((item, index) => (
                        <img src={item} key={index} alt={item} />
                    ))}
                </div>
                <div className={cx('slider-btn')}>
                    <button className={cx('prev-item')} onClick={() => paginate(currentIndex - 1)}>
                        <PreviousIcon className={cx('btn-icon')} />
                    </button>
                    <button className={cx('next-item')} onClick={() => paginate(currentIndex + 1)}>
                        <NextIcon className={cx('btn-icon')} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SliderBanner;
