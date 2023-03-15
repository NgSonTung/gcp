import React, { useEffect, useState } from 'react';
import ListProduct from '../../../components/ListProduct/index';
import DataProduct from '~/data/products';
import { useNavigate, useLocation } from 'react-router-dom';

export const AllProducts = () => {
    //tam thoi lay data tu file
    const navigate = useNavigate();
    const location = useLocation();
    const pathName = location.pathname;
    const [filter, setFilter] = useState({
        category: '',
        price: '',
        brand: '',
    });

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const category = queryParams.get('category') || '';
        const price = queryParams.get('price') || '';
        const date = queryParams.get('date') || '';

        setFilter({ category, price, date });

        // axios.get(`/api/data?category=${category}&price=${price}&date=${date}`)
        //   .then(response => {
        //     // handle the response data
        //   })
        //   .catch(error => {
        //     // handle the error
        //   });
    }, [location.search]);

    useEffect(() => {
        console.log('history', navigate);
        console.log('location', location);
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        navigate(`${pathName}?category=${filter.category}&price=${filter.price}&date=${filter.brand}`);
    };

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
            <form onSubmit={handleSubmit}>
                <input
                    type="checkbox"
                    value="phone"
                    onChange={(e) => setFilter({ ...filter, category: e.target.value })}
                />
                <input
                    type="text"
                    value={filter.price}
                    onChange={(e) => setFilter({ ...filter, price: e.target.value })}
                />
                <input type="checkbox" value="vivo" onChange={(e) => setFilter({ ...filter, brand: e.target.value })} />
                <button type="submit">Filter</button>
            </form>
        </div>
    );
};

export default AllProducts;
