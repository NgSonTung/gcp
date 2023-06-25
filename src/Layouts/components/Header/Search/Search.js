import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { SearchIcon } from '~/Icons';
import { FetchFn } from '~/functions';
import { useEffect, useRef, useState } from 'react';
import useDebounce from '~/Hooks/useDebounce';
import HeadlessTippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import SearchProducts from '~/components/SearchedProduct/SearchedProduct';
import { Link, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const Search = () => {
    let navigate = useNavigate();

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
        const products = await FetchFn.getProductByName(
            `http://localhost:3001/api/v1/product/?page=1&pageSize=6&name=${searchValue}`,
        );
        const result = await products?.data?.products?.dataProducts;
        console.log(result);
        setOutputProducts(result);
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

    const handleSubmitSearch = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            if (searchValue !== '') {
                navigate(`/searchcatalog/?name=${searchValue}`);
            }
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
                            {outputProducts.map((item, index) => (
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
                            onKeyDown={handleSubmitSearch}
                        />
                        <Link to={`/searchCatalog/?name=${searchValue}`}>
                            <button className={cx('find-btn')}>
                                <SearchIcon className={cx('icon')} />
                            </button>
                        </Link>
                    </div>
                </div>
            </HeadlessTippy>
        </div>
    );
};

export default Search;
