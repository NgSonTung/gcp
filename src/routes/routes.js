import config from '~/config';

// Layouts
import Home from '../pages/Home/Home';
import AllProducts from '~/pages/Products/AllProducts/AllProducts';
import Phone from '~/pages/Products/Phone/Phone';
import Laptop from '~/pages/Products/Laptop/Laptop';
import NetworkDevice from '~/pages/Products/NetworkDevice/NetworkDevice';
import Watch from '~/pages/Products/Watch/Watch';
import Keyboard from '~/pages/Products/Keyboard/Keyboard';
import Tablet from '~/pages/Products/Tablet/Tablet';
import ProductDetail from '~/components/ProductDetail/ProductDetail';
import CheckoutPage from '~/pages/CheckoutPage/CheckoutPage';
import Admin from '~/pages/Admin/Admin';
// Public Routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.allProducts, component: AllProducts },
    { path: config.routes.phone, component: Phone },
    { path: config.routes.networkDevice, component: NetworkDevice },
    { path: config.routes.laptop, component: Laptop },
    { path: config.routes.watch, component: Watch },
    { path: config.routes.keyboard, component: Keyboard },
    { path: config.routes.tablet, component: Tablet },
    { path: config.routes.product, component: ProductDetail },
    { path: config.routes.checkout, component: CheckoutPage },
    { path: config.routes.admin, component: Admin, layout: null },
];

export { publicRoutes };
