import classNames from 'classnames/bind';
import styles from './LinkPaginate.module.scss';
import CateTitle from '../CateTitle/CateTitle';
import LinkItem from '../LinkItem/LinkItem';

const cx = classNames.bind(styles);

const LinkPaginate = ({ object, HandleAddDelete, handleCheckAll, allChecked, jwt, data, setProductChange }) => {
    return (
        <div className={cx('wrapper')}>
            <CateTitle object={object} checked={allChecked} handleCheckAll={handleCheckAll} />
            <div className={cx('link-item-wrapper')}>
                {data?.map((item, index) => {
                    return (
                        <div key={index}>
                            <LinkItem
                                object={object}
                                HandleAddDelete={HandleAddDelete}
                                checked={allChecked}
                                jwt={jwt}
                                data={item}
                                setProductChange={setProductChange}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default LinkPaginate;
