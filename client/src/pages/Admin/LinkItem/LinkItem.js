import classNames from 'classnames/bind';
import styles from './LinkItem.module.scss';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import HandleForm from '../HandleForm/HandleForm';

const cx = classNames.bind(styles);

const formatCurrency = (str) => {
    const regex = /\d{1,3}(?=(\d{3})+(?!\d))/g;
    return `${str.toString().replace(regex, '$&,')}₫`;
};

const LinkItem = ({ object, HandleAddDelete, checked, jwt, data, setProductChange }) => {
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
        console.log('cc');
    }, [checked]);
    useEffect(() => {
        HandleAddDelete(data.productID, isChecked);
    }, [isChecked]);

    return (
        <div className={cx('link-info-wrapper')}>
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
                <p className={cx('new_link')}>{formatCurrency(data?.price)}</p>
            </div>
            <div className={cx('link-handle-wrapper')}>
                <button className={cx('handle-link-btn')} onClick={handleShowEditForm}>
                    <FontAwesomeIcon className={cx('btn-icon')} icon={faEllipsis} />
                </button>
            </div>
            {showEditForm && (
                <HandleForm
                    jwt={jwt}
                    setProductChange={setProductChange}
                    setShowEditForm={setShowEditForm}
                    data={data}
                    formType={'UpdateRemove'}
                    object={object}
                />
            )}
        </div>
    );
};

export default LinkItem;
