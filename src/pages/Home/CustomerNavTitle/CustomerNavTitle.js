import NavTitle from '~/components/NavTitle/NavTitle';
import CustomerSlider from './CustomerSlider/CustomerSlider';
const navItems = [{ id: '1', title: 'KHÁCH HÀNG THANH LUXURY MOBILE', component: <CustomerSlider /> }];

const CustomerNavTitle = () => {
    return <NavTitle navItems={navItems} />;
};

export default CustomerNavTitle;
