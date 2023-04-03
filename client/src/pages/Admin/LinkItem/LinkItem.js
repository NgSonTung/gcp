import classNames from 'classnames/bind';
import styles from './LinkItem.module.scss';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import HandleForm from '../HandleForm/HandleForm';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const formatCurrency = (str) => {
    const regex = /\d{1,3}(?=(\d{3})+(?!\d))/g;
    return `${str.toString().replace(regex, '$&,')}₫`;
};

const LinkItem = ({ object, HandleAddDelete, checked, jwt, data, setDataChange }) => {
    const [showEditForm, setShowEditForm] = useState(false);
    const [isChecked, setIsChecked] = useState(checked);
    const inputRef = useRef();

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
        // <Link to={`/product/${data?.name}`}>
        <div className={cx('link-info-wrapper')}>
            {object === 'product' ? (
                <div className={cx('link-item')}>
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
                    <p className={cx('old_link')}>{data?.brand}</p>
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
        // </Link>
    );
};

export default LinkItem;
