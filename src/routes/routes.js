import config from '~/config';

// Layouts
import Home from '../pages/Home/Home';

// Public Routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    // { path: config.routes.allproducts, component: AllProducts },
    // { path: config.routes.productcart, component: ProductCart, layout: null },
];

export { publicRoutes };
