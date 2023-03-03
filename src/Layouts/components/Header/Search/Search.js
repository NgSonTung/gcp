import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { SearchIcon } from '~/Icons';
import { FetchFn } from '~/functions';
import { useEffect, useRef, useState } from 'react';
import { useDebounce } from '~/Hooks';
import HeadlessTippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import HomeProductBestSale from '~/pages/Home/HomeProductBestSale/index';
import ProductBestSale from '~/components/ProductBestSale/index';
import ProductItem from '~/components/ProductItem/ProductItem';
import SearchProducts from '~/components/SearchedProduct/SearchedProduct';

const cx = classNames.bind(styles);

const Search = () => {
    const [searchValue, setSearchValue] = useState('');
    const [outputProducts, setOutputProducts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [limitProducts, setLimitProducts] = useState(20);
    const debouncedValue = useDebounce(searchValue, 1000);
    const inputRef = useRef();

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setOutputProducts([]);
            return;
        }

        fetchProducts();
    }, [debouncedValue]);

    const fetchProducts = async () => {
        const products = await FetchFn.getAllProducts('https://api.npoint.io/c682cd1927ef20da8d42');
        const searchProducts = await products.filter((item) =>
            item.name.toLowerCase().includes(debouncedValue.toLowerCase()),
        );
        setOutputProducts(searchProducts);
    };

    const HandleClearInput = () => {
        setSearchValue('');
        setOutputProducts([]);
        inputRef.current.focus();
    };

    const handleInputChange = (e) => {
        const searchValue = e.target.value;
        const KEY_SPACE = /\s/g;

        if (!KEY_SPACE.test(searchValue[0])) {
            setSearchValue(searchValue);
        }
    };

    return (
        <div>
            <HeadlessTippy
                interactive={true}
                visible={showResult && outputProducts.length > 0}
                placement="bottom"
                render={(attrs) => (
                    <div className={cx('popper-wrapper')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            {outputProducts.slice(1, limitProducts + 1).map((item, index) => (
                                <SearchProducts key={index} data={item} />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={() => setShowResult(false)}
            >
                <div className={cx('wrapper')}>
                    <div className={cx('input-container')}>
                        <input
                            ref={inputRef}
                            value={searchValue}
                            type="text"
                            placeholder="Từ khóa tìm kiếm"
                            onChange={handleInputChange}
                            onFocus={() => setShowResult(true)}
                            onM={() => setShowResult(false)}
                        />
                        <button className={cx('find-btn')}>
                            <SearchIcon className={cx('icon')} />
                        </button>
                    </div>
                </div>
            </HeadlessTippy>
        </div>
    );
};

export default Search;
