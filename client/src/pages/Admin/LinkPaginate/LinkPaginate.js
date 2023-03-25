import classNames from 'classnames/bind';
import styles from './LinkPaginate.module.scss';
import CateTitle from '../CateTitle/CateTitle';
import LinkItem from '../LinkItem/LinkItem';

const cx = classNames.bind(styles);

const LinkPaginate = ({ data, setProductChange }) => {
    // -------------

    return (
        <div className={cx('wrapper')}>
            {console.log('rendered')} <CateTitle />
            <div className={cx('link-item-wrapper')}>
                {data?.map((item, index) => {
                    return (
                        <div key={index}>
                            <LinkItem data={item} setProductChange={setProductChange} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default LinkPaginate;
