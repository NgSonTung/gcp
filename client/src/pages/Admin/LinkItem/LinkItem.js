import classNames from 'classnames/bind';
import styles from './LinkItem.module.scss';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState, useEffect } from 'react';
import HandleForm from '../HandleForm/HandleForm';
const cx = classNames.bind(styles);

const LinkItem = (props) => {
    const { id, isActive, onButtonClick, data, setActiveKey } = props;
    const [showEditLink, setShowEditLink] = useState(true);
    const [showEditForm, setShowEditForm] = useState(false);
    const iconRef = useRef();
    const inputRef = useRef();

    const handleShowEditForm = () => {
        setShowEditForm(true);
        setActiveKey(false);
    };

    const handleButtonClick = () => {
        onButtonClick(id);
    };

    return (
        <div key={id} className={cx('link-info-wrapper')}>
            <div className={cx('link-item')}>
                <div className={cx('description')}>
                    <input className={cx('input-checked')} ref={inputRef} value={data.id} type="checkbox" />
                    <p className={cx('text')}>{data?.name}</p>
                </div>
                <p className={cx('old_link')}>{data?.brand}</p>
                <p className={cx('new_link')}>{data?.price}</p>
            </div>
            <div className={cx('link-handle-wrapper')}>
                <button className={cx('handle-link-btn')}>
                    <FontAwesomeIcon
                        ref={iconRef}
                        className={cx('btn-icon', { active: isActive })}
                        onClick={handleButtonClick}
                        icon={faEllipsis}
                    />
                    {isActive && (
                        <div className={cx('menu-wrapper')}>
                            <div className={cx('edit-wrapper')} onClick={handleShowEditForm}>
                                <FontAwesomeIcon icon={faPen} />
                                <p className={cx('text')}>Chỉnh sửa</p>
                            </div>
                            <div className={cx('delete-wrapper')}>
                                <FontAwesomeIcon icon={faTrashCan} />
                                <p className={cx('text')}>Hủy mapping link</p>
                            </div>
                        </div>
                    )}
                </button>
            </div>
            {showEditForm && <HandleForm data={data} />}
        </div>
    );
};

export default LinkItem;
