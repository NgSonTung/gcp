import classNames from 'classnames/bind';
import styles from './UserAction.module.scss';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faPlus, faUpload, faTrash } from '@fortawesome/free-solid-svg-icons';
import HandleForm from '../HandleForm/HandleForm';
import { deleteMultipleProductsById } from '~/functions/ProductFetch';
import { deleteMultipleUsersById } from '~/functions/UserFetch';

const cx = classNames.bind(styles);

const UserAction = ({
    brands,
    categories,
    object,
    setAllChecked,
    setDeleteIds,
    deleteIds,
    jwt,
    handleDataChange,
    handleStateDeleted,
}) => {
    const [showEditForm, setShowEditForm] = useState(false);

    const HandleShowEditForm = () => {
        setShowEditForm(true);
    };

    const HandleDeleteProducts = () => {
        let msgPromise;
        if (window.confirm('Xóa item này sẽ xóa những item ở bảng liên quan')) {
            if (object === 'product') {
                msgPromise = deleteMultipleProductsById(deleteIds, jwt);
            } else if (object === 'user') {
                msgPromise = deleteMultipleUsersById(deleteIds, jwt);
            }
            msgPromise.then((msg) => {
                alert(msg);
                // setDataChange(true);
                handleDataChange();
                setDeleteIds([]);
                setAllChecked(false);
                handleStateDeleted();
            });
        }
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
                        brands={brands}
                        categories={categories}
                        jwt={jwt}
                        // setDataChange={setDataChange}
                        setShowEditForm={setShowEditForm}
                        data={{}}
                        object={object}
                        formType={'Add'}
                    />
                )}
            </div>
        </div>
    );
};

export default UserAction;
