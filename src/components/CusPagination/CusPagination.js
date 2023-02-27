import React from 'react';
import { Box, Pagination } from '@mui/material';
function CusPagination(props) {
    const { itemPerPage, totalItem, handlePage } = props;

    return (
        <div>
            <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                sx={{
                    margin: '1rem 0',
                }}
            >
                <Pagination count={Math.ceil(totalItem / itemPerPage)} onChange={(event, page) => handlePage(page)} />
            </Box>
        </div>
    );
}
export default CusPagination;
