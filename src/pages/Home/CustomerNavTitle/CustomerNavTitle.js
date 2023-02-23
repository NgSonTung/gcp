import NavTitle from '~/components/NavTitle/NavTitle';
import CustomerSlider from '../CustomerSlider/CustomerSlider';
const navItems = [
    { id: '1', title: 'KHÁCH HÀNG THANH LUXURY MOBILE', component: <CustomerSlider /> },
    { id: '2', title: 'kekekeke', component: <div>ccccc</div> },
];

const CustomerNavTitle = () => {
    return <NavTitle navItems={navItems} />;
};

export default CustomerNavTitle;
