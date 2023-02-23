import classNames from 'classnames/bind';
import styles from './TextTitle.module.scss';

const cx = classNames.bind(styles);

const TextTitle = (props) => {
    return (
        <div className={cx('title-container')}>
            {props.textTitles.map((title) => {
                return (
                    <div className={cx('desc-container')}>
                        <div className={cx('icon-wrapper')}>{<title.icon className={cx('icon')} />}</div>
                        <div className={cx('desc-wrapper')}>
                            <p className={cx('title')}>{title.title}</p>
                            <p className={cx('desc')}>{title.desc}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default TextTitle;
