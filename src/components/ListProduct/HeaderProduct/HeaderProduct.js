import React from 'react';
import classNames from 'classnames/bind';
import style from './HeaderProduct.module.scss';
import TextTitle from '~/components/TextTitle/index';
const cx = classNames.bind(style);

const HeaderProduct = (props) => {
    const { title, count } = props;
    return (
        <div className={cx('HeaderProduct-wrapper')}>
            <TextTitle title={title} />
        </div>
    );
};

export default HeaderProduct;
