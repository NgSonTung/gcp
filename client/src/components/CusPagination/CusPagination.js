import React from 'react';
import { Box, Pagination } from '@mui/material';
import classNames from 'classnames/bind';
import style from './CusPagination.module.scss';
const cx = classNames.bind(style);
function CusPagination(props) {
    const { itemPerPage, totalItem, handlePage } = props;

    return (
        <div>
            <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                sx={{
                    margin: '2rem 0',
                    height: 'auto',
                }}
            >
                <Pagination
                    count={Math.ceil(totalItem / itemPerPage)}
                    onChange={(event, page) => handlePage(page)}
                    size="large"
                    fontSize="16px"
                    className={cx('pagination')}
                />
            </Box>
        </div>
    );
}
export default CusPagination;
