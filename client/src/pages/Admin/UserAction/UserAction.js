import classNames from 'classnames/bind';
import styles from './UserAction.module.scss';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faPlus, faUpload, faTrash } from '@fortawesome/free-solid-svg-icons';
import HandleForm from '../HandleForm/HandleForm';
import { deleteMultipleProductsById } from '~/functions/ProductFetch';

const cx = classNames.bind(styles);

const UserAction = ({ setAllChecked, setDeleteIds, deleteIds, jwt, setProductChange }) => {
    const [showEditForm, setShowEditForm] = useState(false);

    const HandleShowEditForm = () => {
        setShowEditForm(true);
    };

    const HandleDeleteProducts = () => {
        const msgPromise = deleteMultipleProductsById(deleteIds, jwt);
        msgPromise.then((msg) => {
            alert(msg);
            setProductChange(true);
            setDeleteIds([]);
            setAllChecked(false);
        });
    };

    return (
        <div>
            <div className={cx('user-action')}>
                <div className={cx('filter-box-wrapper')}>
                    <div className={cx('link-filter-box')}>
                        <p className={cx('title')}>Dead link sản phẩm</p>
                        <input type="checkbox" />
                    </div>
                    <div className={cx('link-filter-box')}>
                        <p className={cx('title')}>Dead link bài viết & khác</p>
                        <input type="checkbox" />
                    </div>
                </div>
                <div className={cx('handle-link-wrapper')}>
                    <button className={cx('add-btn')} onClick={HandleShowEditForm}>
                        <FontAwesomeIcon icon={faPlus} />
                        <p className={cx('text')}>THÊM MỚI</p>
                    </button>
                    <button className={cx('add-btn')} onClick={HandleDeleteProducts}>
                        <FontAwesomeIcon icon={faTrash} />
                        <p className={cx('text')}>XÓA</p>
                    </button>
                </div>
            </div>
            <div>
                {showEditForm && (
                    <HandleForm
                        jwt={jwt}
                        setProductChange={setProductChange}
                        setShowEditForm={setShowEditForm}
                        data={{}}
                        formType={'Add'}
                    />
                )}
            </div>
        </div>
    );
};

export default UserAction;
