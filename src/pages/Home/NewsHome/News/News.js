import classNames from 'classnames/bind';
import styles from './News.module.scss';
const cx = classNames.bind(styles);
function News(data) {
    // hard data
    data = [
        {
            id: 0,
            date: ' 14:44 - 17/02/2023',
            tag: 'post',
            image: 'https://thanhmobile.vn/uploads/plugin/news/97/hinh-nh-u-tien-c-a-iphone-15-pro-ip15.jpg',
            name: 'Hình ảnh đầu tiên của iPhone 15 Pro',
            description:
                'Ảnh dựng của iPhone 15 Pro cho thấy nhiều chi tiết như cổng USB-C, nút nguồn cảm ứng và cụm camera sau dày hơn thế hệ trước.',
        },
        {
            id: 1,
            date: '13:54 - 17/02/2023',
            tag: 'post',
            image: 'https://thanhmobile.vn/uploads/plugin/news/96/lo-i-iphone-chinh-hang-gia-m-m-khong-xu-t-hi-n-t-i-vi-t-nam-tintuc.jpg',
            name: 'Loại iPhone chính hãng giá mềm không xuất hiện tại Việt Nam',
            description:
                'Các sản phẩm di động tân trang được nhiều người lựa chọn ở thị trường phương Tây do rẻ hơn, được hãng đảm bảo ',
        },
        {
            id: 2,
            date: '17:11 - 05/12/2022',
            tag: 'post',
            image: 'https://thanhmobile.vn/uploads/plugin/news/95/iphone-14-pro-max-c-anh-gia-co-man-hinh-t-t-nh-t-th-gi-i-i.jpg',
            name: 'iPhone 14 Pro Max được đánh giá có màn hình tốt nhất thế giới',
            description:
                'Các sản phẩm di động tân trang được nhiều người lựa chọn ở thị trường phương Tây do rẻ hơn, được hãng đảm bảo ',
        },
    ];
    return <div className={cx('News-warpper')}></div>;
}

export default News;
