import classNames from 'classnames/bind';
import styles from '.';
import NavTitle from '~/components/NavTitle/NavTitle';
import CustomerSlider from '../CustomerSlider/CustomerSlider';
import data from '~/data/data.json';
import { useEffect } from 'react';
const cx = classNames.bind(styles);
const navItems = [
    { id: '1', title: 'KHÁCH HÀNG THANH LUXURY MOBILE', component: <CustomerSlider /> },
    { id: '2', title: 'kekekeke', component: <div>ccccc</div> },
];

const CustomerNavTitle = () => {
    const newProduct = data.filter((item) => item.favorite === true);
    useEffect(() => {
        console.log(newProduct);
    });
    return <NavTitle navItems={navItems} />;
};

export default CustomerNavTitle;
