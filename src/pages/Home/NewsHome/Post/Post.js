import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import style from './Post.module.scss';
const cx = classNames.bind(style);
function Post(props) {
    const { srcImg, postDate, postName, postDecrip } = props;
    return (
        <div className={cx('post-warpper')}>
            <div className={cx('post-item')}>
                <div className={cx('item-img')}>
                    <img src={srcImg} alt="anh bai post" className={cx('post-avatar')} />
                </div>
                <div className={cx('post-info')}>
                    <span className={cx('post-date')}>{postDate}</span>
                    <span className={cx('post-name')}>{postName}</span>
                    <span className={cx('post-decrip')}>{postDecrip}</span>
                </div>
                <div classNames={cx('post-more')}>
                    <Link to={'/more'}>
                        <span>Xem thêm</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
export default Post;
