import TextTitle from '~/components/TextTitle/TextTitle';
import { CloseIcon, MenuIcon, SearchIcon } from '~/Icons/Icons';

const textTitles = [
    {
        id: '1',
        title: 'HOTLINE: 0969882266',
        desc: 'Tổng Đài Tư Vấn Và Bán Hàng',
        icon: CloseIcon,
    },
    {
        id: '2',
        title: 'HOÀN TIỀN 100%',
        desc: 'Nếu Sản Phẩm Không Phải Chính Hãng',
        icon: MenuIcon,
    },
    {
        id: '3',
        title: 'BÁN TRẢ GÓP',
        desc: 'Trả góp linh hoạt từ 3 đến 12 tháng',
        icon: SearchIcon,
    },
];

const HomeTextTitle = (props) => {
    return <TextTitle textTitles={textTitles} />;
};

export default HomeTextTitle;
