import classNames from 'classnames/bind';
import styles from './TabProductCate.module.scss';
import { useState, useEffect } from 'react';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import ProductSlider from '../ProductSlider/ProductSlider';
import { getAllProducts } from '~/functions/ProductFetch';

const cx = classNames.bind(styles);

function TabProductCate(props) {
    const [value, setValue] = useState('0');
    const [appleProducts, setAppleProducts] = useState(null);
    const [samsungProducts, setSamsungProducts] = useState(null);
    const [xiaomiProducts, setXiaomiProducts] = useState(null);
    const tabTitle = [
        { title: 'Apple', products: appleProducts },
        { title: 'Samsung', products: samsungProducts },
        { title: 'Xiaomi', products: xiaomiProducts },
    ];

    const handleGetData = async () => {
        const appleData = await getAllProducts('http://localhost:3001/api/v1/product/?page=1&pageSize=20?&brandID=2');
        setAppleProducts(appleData?.data?.products?.dataProducts);
        const samsungData = await getAllProducts(
            'http://localhost:3001/api/v1/product/?page=1&pageSize=20?&brandID=22',
        );
        setSamsungProducts(samsungData?.data?.products?.dataProducts);
        const xiaomiData = await getAllProducts('http://localhost:3001/api/v1/product/?page=1&pageSize=20?&brandID=10');
        setXiaomiProducts(xiaomiData?.data?.products?.dataProducts);
    };
    useEffect(() => {
        handleGetData();
    }, []);
    const handleChange = (event, newValue) => {
        setValue(newValue.toString());
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value.toString()} sx={{ display: 'flex' }}>
                <Box>
                    <TabList
                        sx={{
                            marginBottom: '3rem',
                            '.MuiTabs-indicator': { backgroundColor: 'red', height: '3px' },
                        }}
                        className={cx('title-wrapper')}
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                    >
                        {tabTitle.map((item, index) => (
                            <Tab
                                key={index}
                                sx={{
                                    fontSize: '1.75rem',
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase',
                                    '&.Mui-selected': {
                                        color: 'black !important',
                                    },
                                }}
                                className={cx('title')}
                                label={item.title}
                                value={index.toString()}
                            />
                        ))}
                    </TabList>
                </Box>
                <div className={cx('panel-wrapper')}>
                    <div className={cx('img-banner')}>
                        <img
                            className={cx('img')}
                            src="https://thanhmobile.vn/uploads/plugin/gallery/174/s-n-ph-m-m-i-gia.jpg"
                            alt="img"
                        />
                    </div>
                    {tabTitle.map((data, index) => (
                        <TabPanel
                            key={index}
                            sx={{ padding: '0' }}
                            value={index.toString()}
                            className={cx('product-wrapper')}
                        >
                            {data?.products && <ProductSlider data={data?.products} />}
                        </TabPanel>
                    ))}
                </div>
            </TabContext>
        </Box>
    );
}

export default TabProductCate;
