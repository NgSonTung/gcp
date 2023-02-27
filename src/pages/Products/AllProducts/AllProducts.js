import React from 'react';
import ListProduct from './ListProduct';
import DataProduct from '~/data/data';
export const AllProducts = () => {
    //tam thoi lay data tu file
    return (
        <div>
            <ListProduct data={DataProduct} />
        </div>
    );
};

export default AllProducts;
