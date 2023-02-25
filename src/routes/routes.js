import config from '~/config';

// Layouts
import Home from '../pages/Home/Home';
import Contact from '~/pages/Contact/Contact';
import Discount from '~/pages/Discount/Discount';
import News from '~/pages/News/News';
import IntroducePage from '~/pages/IntroducePage/IntroducePage';
import BuyingInstruction from '~/pages/BuyingInstruction/BuyingInstruction';
import ProductDetail from '~/components/ProductDetail/ProductDetail';

// Public Routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.contact, component: Contact },
    { path: config.routes.discount, component: Discount },
    { path: config.routes.news, component: News },
    { path: config.routes.introducePage, component: IntroducePage },
    { path: config.routes.buyingInstruction, component: BuyingInstruction },
    { path: config.routes.productDetail, component: ProductDetail },
];

export { publicRoutes };
