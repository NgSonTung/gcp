import classNames from 'classnames/bind';
import styles from './TabProductCate.module.scss';
import { useState } from 'react';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import ProductSlider from '../ProductSlider/ProductSlider';
import data from '~/data/data.json';

const cx = classNames.bind(styles);
const favData = data.filter((item) => item.favorite === true);
const unfavData = data.filter((item) => item.favorite === false);
const apple = data.filter((item) => item.brand === 'apple');

const tabTitle = [
    { title: 'Sản phẩm mới', products: favData },
    { title: 'Sản phẩm nổi bật', products: unfavData },
    { title: 'Khuyến mãi', products: apple },
];

function TabProductCate() {
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        {tabTitle.map((item, index) => (
                            <Tab label={item.title} value={index} />
                        ))}
                    </TabList>
                </Box>
                {tabTitle.map((data, index) => (
                    <TabPanel value={index}>
                        <ProductSlider data={data.products} />
                    </TabPanel>
                ))}
            </TabContext>
        </Box>
    );
}

export default TabProductCate;
