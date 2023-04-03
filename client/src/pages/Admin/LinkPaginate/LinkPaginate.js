import classNames from 'classnames/bind';
import styles from './LinkPaginate.module.scss';
import CateTitle from '../CateTitle/CateTitle';
import LinkItem from '../LinkItem/LinkItem';

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
    return (
        <div>
            <div className={cx('wrapper')}>
                <CateTitle object={object} checked={allChecked} handleCheckAll={handleCheckAll} />
                <div className={cx('link-item-wrapper')}>
                    {data?.data?.map((item, index) => (
                        <div key={index}>
                            <LinkItem
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
        </div>
    );
};

export default LinkPaginate;
