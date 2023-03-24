import classNames from 'classnames/bind';
import styles from './LinkItem.module.scss';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from 'react';
import HandleForm from '../HandleForm/HandleForm';
const cx = classNames.bind(styles);

const LinkItem = ({ data }) => {
    const [showEditForm, setShowEditForm] = useState(false);
    const iconRef = useRef();
    const inputRef = useRef();

    const handleShowEditForm = () => {
        setShowEditForm(true);
    };

    return (
        <div className={cx('link-info-wrapper')}>
            <div className={cx('link-item')}>
                <div className={cx('description')}>
                    <input className={cx('input-checked')} ref={inputRef} value={data.id} type="checkbox" />
                    <p className={cx('text')}>{data?.name}</p>
                </div>
                <p className={cx('old_link')}>{data?.brand}</p>
                <p className={cx('new_link')}>{data?.price}</p>
            </div>
            <div className={cx('link-handle-wrapper')}>
                <button className={cx('handle-link-btn')} onClick={handleShowEditForm}>
                    <FontAwesomeIcon ref={iconRef} className={cx('btn-icon')} icon={faEllipsis} />
                </button>
            </div>
            {showEditForm && <HandleForm setShowEditForm={setShowEditForm} data={data} formType={'UpdateRemove'} />}
        </div>
    );
};

export default LinkItem;
