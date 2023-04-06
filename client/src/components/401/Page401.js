import React from 'react';
import style from './Page401.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(style);

const Page401 = () => {
    return (
        <div>
            <div className={cx('wrapper')}>
                <img src={require('./401-1.jpg')} alt="401" />
                <div className={cx('wrapper-text')}></div>
            </div>
        </div>
    );
};
export default Page401;
