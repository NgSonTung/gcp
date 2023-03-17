import classNames from 'classnames/bind';
import styles from './TabProductCate.module.scss';
import { useState } from 'react';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import ProductSlider from '../ProductSlider/ProductSlider';
import data from '~/data/data.json';

const cx = classNames.bind(styles);
const laptop = data.filter((item) => item.category === 'laptop');
const samsung = data.filter((item) => item.brand === 'samsung');
const apple = data.filter((item) => item.brand === 'apple');

const tabTitle = [
    { title: 'Sản phẩm nổi bật', products: laptop },
    { title: 'Sản phẩm mới', products: samsung },
    { title: 'Khuyến mãi', products: apple },
];

function TabProductCate(props) {
    const [value, setValue] = useState('0');

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
                            <ProductSlider data={data.products} />
                        </TabPanel>
                    ))}
                </div>
            </TabContext>
        </Box>
    );
}

export default TabProductCate;
