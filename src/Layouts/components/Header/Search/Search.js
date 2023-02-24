import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { SearchIcon } from '~/Icons';
import { FetchFn } from '~/functions';
import { useEffect, useRef, useState } from 'react';
import { useDebounce } from '~/Hooks';

const cx = classNames.bind(styles);

const Search = () => {
    const [searchValue, setSearchValue] = useState('');
    const [outputProducts, setOutputProducts] = useState([]);
    const debouncedValue = useDebounce(searchValue, 1000);
    const inputRef = useRef();

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setOutputProducts([]);
            return;
        }
        (async () => {
            const products = await FetchFn.getAllProducts('https://api.npoint.io/c682cd1927ef20da8d42');
            const searchProducts = await products.filter((item) =>
                item.name.toLowerCase().includes(debouncedValue.toLowerCase()),
            );
            console.log(searchProducts);
            setOutputProducts(searchProducts);
        })();
    }, [debouncedValue]);

    const handleInputChange = (e) => {
        const searchValue = e.target.value;
        const KEY_SPACE = /\s/g;

        if (!KEY_SPACE.test(searchValue[0])) {
            setSearchValue(searchValue);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('input-container')}>
                <input
                    ref={inputRef}
                    value={searchValue}
                    type="text"
                    placeholder="Từ khóa tìm kiếm"
                    onChange={handleInputChange}
                />
                <button className={cx('find-btn')}>
                    <SearchIcon className={cx('icon')} />
                </button>
            </div>
            {outputProducts?.map((item) => (
                <h1>{item.name}</h1>
            ))}
        </div>
    );
};

export default Search;
