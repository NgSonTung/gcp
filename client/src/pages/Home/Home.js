import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import CustomerNavTitle from './CustomerNavTitle/CustomerNavTitle';
import TextTitle from './HomeTextTitle/HomeTextTitle';
import HomeProductBestSale from './HomeProductBestSale/index';
import SliderBanner from './SliderBanner/index';
import TabProductCate from '~/components/TabProductsCate/TabProductCate';
const cx = classNames.bind(styles);

function Home() {
    // const dispatch = useDispatch();
    // const { isLoggedIn, userID } = useSelector((state) => state.UserReducer);

    // useEffect(() => {
    //     getDataOfCart();
    // }, [isLoggedIn]);

    // const getDataOfCart = async () => {
    //     const url = `http://localhost:3001/api/v1/checkout/${userID}`;
    //     let result = await CartFetch.getProductInCartByUSerID(url);
    //     if (result && isLoggedIn) {
    //         const action = {
    //             type: 'LOAD_DEFAULT_CART_FROM_DB',
    //             payload: result.result,
    //         };
    //         dispatch(action);
    //     } else {
    //         const action = {
    //             type: 'LOAD_DEFAULT_CART_FROM_DB',
    //             payload: 'logout',
    //         };
    //         dispatch(action);
    //     }
    // };

    return (
        <div className={cx('wrapper')}>
            <SliderBanner />
            <CustomerNavTitle />
            <TextTitle />
            <TabProductCate />
            <HomeProductBestSale cate={'phone'} srcImgBanner={require('~/assets/images/anh-sale-tet.png')} />
            <HomeProductBestSale cate={'laptop'} srcImgBanner={require('~/assets/images/phu-kien-hot.png')} />
        </div>
    );
}

export default Home;
