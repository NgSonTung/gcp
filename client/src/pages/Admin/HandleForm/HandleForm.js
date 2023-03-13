import classNames from 'classnames/bind';
import styles from './HandleForm.module.scss';
import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const cx = classNames.bind(styles);

const HandleForm = ({ handleFormModal, data, handleShowAddForm }) => {
    const [descriptionValue, setDescriptionValue] = useState(data ? data.description : '');
    const [oldLinkValue, setOldLinkValue] = useState(data ? data.old_link : '');
    const [newLinkValue, setNewLinkValue] = useState(data ? data.new_link : '');
    const [typeLinkInput, setTypeLinkInput] = useState(data ? data.type : '');
    const radioCheck = useRef();
    const dispatch = useDispatch();
    const handleSubmit = () => {
        if (!data) {
            if (descriptionValue !== '' && oldLinkValue !== '' && newLinkValue !== '' && typeLinkInput !== '') {
                dispatch({
                    type: 'ADD_LINK',
                    payload: {
                        description: descriptionValue,
                        old_link: oldLinkValue,
                        new_link: newLinkValue,
                        type: typeLinkInput,
                    },
                });
                setDescriptionValue('');
                setOldLinkValue('');
                setNewLinkValue('');
                setTypeLinkInput('');
                window.alert('Them thanh cong');
            } else {
                window.alert('Vui long nhap du thong tin');
            }
        } else {
            dispatch({
                type: 'EDIT_LINK',
                payload: {
                    idLink: data.id,
                    updateDescription: descriptionValue,
                    updateOldLink: oldLinkValue,
                    updateNewLink: newLinkValue,
                    updateType: typeLinkInput,
                },
            });

            window.alert('Sua thanh cong');
        }
    };

    const handleCloseForm = () => {
        if (data) {
            handleFormModal();
        } else {
            handleShowAddForm();
        }
    };

    return (
        <div className={cx('form-wrapper')}>
            <div className={cx('form-header')}>
                <p className={cx('text')}>DEAD LINK</p>
            </div>
            <div className={cx('form-cate')}>
                <p className={cx('cate-title')}>Phân Loại</p>
                <div className={cx('radio-wrapper')}>
                    <input
                        id="product"
                        name="link_category"
                        type="radio"
                        value="product"
                        ref={radioCheck}
                        onClick={() => setTypeLinkInput('product')}
                    />
                    <label htmlFor="product" className={cx('title')}>
                        Dead link sản phẩm
                    </label>
                    <input
                        id="post"
                        name="link_category"
                        type="radio"
                        value="post"
                        ref={radioCheck}
                        onClick={() => setTypeLinkInput('post')}
                    />
                    <label htmlFor="post" className={cx('title')}>
                        Dead link bài viết & khác
                    </label>
                </div>
                <div className={cx('form-inputs')}>
                    <div className={cx('description-input')}>
                        <p className={cx('title')}>Mô tả link</p>
                        <input
                            type="text"
                            name="description_input"
                            placeholder="Nhap thong tin"
                            value={descriptionValue}
                            onChange={(e) => setDescriptionValue(e.target.value)}
                        />
                    </div>
                    <div className={cx('old_link-input')}>
                        <p className={cx('title')}>Link site cũ</p>
                        <input
                            type="text"
                            name="old_link"
                            placeholder="Nhap thong tin"
                            value={oldLinkValue}
                            onChange={(e) => setOldLinkValue(e.target.value)}
                        />
                    </div>
                    <div className={cx('new_link-input')}>
                        <p className={cx('title')}>Link site mới</p>
                        <input
                            type="text"
                            name="new_link"
                            placeholder="Nhap thong tin"
                            value={newLinkValue}
                            onChange={(e) => setNewLinkValue(e.target.value)}
                        />
                    </div>
                    <div className={cx('form-submit')}>
                        <button className={cx('close-btn')} onClick={handleCloseForm}>
                            Đóng
                        </button>
                        <button className={cx('update-btn')} onClick={handleSubmit}>
                            Cập nhật
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HandleForm;
