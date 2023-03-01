import React from 'react';
import ListProduct from '../../../components/ListProduct/index';
import DataProduct from '~/data/data';
export const AllProducts = () => {
    //tam thoi lay data tu file
    return (
        <div>
            <ListProduct
                data={DataProduct}
                ColOnPerRowSmallest={6}
                ColOnPerRowSmall={6}
                ColOnPerRowMiddle={4}
                ColOnPerRowLarge={3}
                ColOnPerRowExtraLarge={2}
            />
        </div>
    );
};

export default AllProducts;
