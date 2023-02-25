import NavTitle from '~/components/NavTitle/NavTitle';
import NewProducts from '../PromotedProducts/NewProducts/NewProducts';
import OnSaleProducts from '../PromotedProducts/OnSaleProducts/OnSaleProducts';
import SpecialProducts from '../PromotedProducts/SpecialProducts/SpecialProducts';

const navItems = [
    { id: '1', title: 'sản phẩm mới', component: <NewProducts /> },
    { id: '2', title: 'sản phẩm nổi bật', component: <SpecialProducts /> },
    { id: '3', title: 'khuyến mại', component: <OnSaleProducts /> },
];

const ProductNavTitle = () => {
    return <NavTitle navItems={navItems} />;
};

export default ProductNavTitle;
