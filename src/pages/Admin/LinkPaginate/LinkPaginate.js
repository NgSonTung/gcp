import classNames from 'classnames/bind';
import styles from './LinkPaginate.module.scss';
import ReactPaginate from 'react-paginate';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faClose, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import CateTitle from '../CateTitle/CateTitle';
import LinkItem from '../LinkItem/LinkItem';
import { useDispatch, useSelector } from 'react-redux';
import data from '~/data/products.json';

const cx = classNames.bind(styles);

const LinkPaginate = (props) => {
    const linkArray = data;
    const [currentItems, setCurrentItems] = useState(null);
    const [itemOffset, setItemOffset] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [activeButton, setActiveButton] = useState(null);
    const [filteredArray, setFilteredArray] = useState(data);

    const { itemsPerPage } = props;

    const dispatch = useDispatch();

    const updateItems = () => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(filteredArray.slice(itemOffset, endOffset));
    };

    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage;
        setItemOffset(newOffset);
        updateItems();
    };

    useEffect(() => {
        if (linkArray) {
            setPageCount(Math.ceil(linkArray.length / itemsPerPage));
        }
    }, [itemOffset, itemsPerPage, linkArray]);

    useEffect(() => {
        updateItems(); // call updateItems when filteredArray changes
    }, [filteredArray, itemOffset, itemsPerPage]);

    const handleBackToFirst = () => {
        setItemOffset(0);
        updateItems();
    };

    const handleBackToLast = () => {
        const lastPageIndex = Math.max(pageCount - 1, 0);
        const lastPageOffset = lastPageIndex * itemsPerPage;
        setItemOffset(lastPageOffset);
        updateItems();
    };

    // -------------
    const handleButtonClick = (id) => {
        setActiveButton(activeButton === id ? null : id);
    };

    return (
        <div className={cx('wrapper')}>
            <CateTitle />
            <div className={cx('link-item-wrapper')}>
                {currentItems?.map((item) => {
                    return (
                        <LinkItem
                            key={item.id}
                            data={item}
                            id={item.id}
                            isActive={activeButton === item.id}
                            onButtonClick={handleButtonClick}
                            setActiveKey={setActiveButton}
                        />
                    );
                })}
            </div>
            <div className={cx('paginate-wrapper')}>
                <button className={cx('back-to-first')} onClick={handleBackToFirst}>
                    Đầu
                </button>
                <ReactPaginate
                    nextLabel={<FontAwesomeIcon className={cx('next-icon')} icon={faChevronRight} />}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel={<FontAwesomeIcon className={cx('prev-icon')} icon={faChevronLeft} />}
                    pageClassName={cx('page-item')}
                    pageLinkClassName="page-link"
                    previousClassName={cx('page-previous-item')}
                    previousLinkClassName="page-link"
                    nextClassName={cx('page-next-item')}
                    nextLinkClassName="page-link"
                    activeClassName={cx('active')}
                    disabledClassName={cx('disabled-page')}
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName={cx('container')}
                    renderOnZeroPageCount={null}
                />
                <button className={cx('back-to-last')} onClick={handleBackToLast}>
                    Cuối
                </button>
            </div>
        </div>
        // {mappingList.length > 0 && (
        //     <div className={cx('mapping-feature')}>
        //         <div className={cx('checked-list-quantity')}>
        //             {/* <p className={cx('quantity')}>{mappingList.length}</p> */}
        //             <p className={cx('checked-text')}>Đã chọn</p>
        //         </div>
        //         <div className={cx('cancel-mapping')} onClick={handleDeleteMapping}>
        //             <FontAwesomeIcon icon={faTrashCan} />
        //             <p className={cx('cancel-text')}>Hủy mapping link</p>
        //         </div>
        //         <div className={cx('cancel-icon')} onClick={handleCancelMapping}>
        //             <FontAwesomeIcon className={cx('icon')} icon={faClose} />
        //         </div>
        //     </div>
        // )}
    );
};

export default LinkPaginate;
