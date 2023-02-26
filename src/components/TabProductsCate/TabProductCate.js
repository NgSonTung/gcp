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

function TabProductCate(props) {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value} sx={{ display: 'flex' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        {tabTitle.map((item, index) => (
                            <Tab label={item.title} value={index} />
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
                        <TabPanel value={index} className={cx('product-wrapper')}>
                            <ProductSlider data={data.products} />
                        </TabPanel>
                    ))}
                </div>
            </TabContext>
        </Box>
    );
}

export default TabProductCate;
