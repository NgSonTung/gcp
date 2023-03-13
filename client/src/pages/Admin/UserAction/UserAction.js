import classNames from 'classnames/bind';
import styles from './UserAction.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faPlus, faUpload } from '@fortawesome/free-solid-svg-icons';
import HandleForm from '../HandleForm/HandleForm';

const cx = classNames.bind(styles);

const UserAction = () => {
    return (
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
                <button className={cx('export-btn')}>
                    <FontAwesomeIcon icon={faUpload} />
                </button>
                <button className={cx('upload-template')}>
                    <FontAwesomeIcon icon={faDownload} />
                    <p className={cx('text')}>Template</p>
                </button>
                <button className={cx('add-btn')}>
                    <FontAwesomeIcon icon={faPlus} />
                    <p className={cx('text')}>THÊM MỚI</p>
                </button>
            </div>
            {/* <HandleForm /> */}
        </div>
    );
};

export default UserAction;