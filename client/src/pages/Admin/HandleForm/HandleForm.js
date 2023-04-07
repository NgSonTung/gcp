import classNames from 'classnames/bind';
import 'react-widgets/scss/styles.scss';
import styles from './HandleForm.module.scss';
import { useRef, useState, useEffect } from 'react';
import { deleteProductById, addProduct, updateProductById } from '~/functions/ProductFetch';
import { deleteUserById, addUser2, updateUserById } from '~/functions/UserFetch';
import DropdownList from 'react-widgets/DropdownList';
import { postUrlFileImage } from '~/functions/UploadFetch';

const cx = classNames.bind(styles);

const HandleForm = ({
    brands = [],
    categories = [],
    jwt,
    data,
    setDataChange,
    setShowEditForm,
    formType = '',
    handleDataChange,
    object = 'default',
}) => {
    const formRef = useRef();

    const HandleUploadProductImg = async (image, productID, alt) => {
        const fileBlob = new Blob([image]);
        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);
        reader.onloadend = async () => {
            await postUrlFileImage(reader.result.split(',')[1], 'productImages', image.name, productID, alt);
        };
    };
    const brandNames = brands.map((brand) => brand.brandName);
    const getBrandById = (id) => {
        return brands.find((brand) => brand.brandID == id);
    };
    const getBrandByName = (name) => {
        return brands.find((brand) => brand.brandName == name);
    };
    const cateNames = categories.map((category) => category.categoryName);
    const getCateById = (id) => {
        return categories.find((category) => category.categoryID == id);
    };
    const getCateByName = (name) => {
        return categories.find((category) => category.categoryName == name);
    };
    const HandleAddItem = () => {
        const currentForm = formRef.current;
        let item;
        let msgPromise;
        if (object === 'product') {
            const image = currentForm.image.files[0];
            item = {
                stock: Number(currentForm.stock.value),
                name: currentForm.name.value,
                image: image.name,
                favorite: currentForm.favorite.checked ? 1 : 0,
                brandID: getBrandByName(currentForm.brand.value).brandID,
                price: Number(currentForm.price.value),
                categoryID: getCateByName(currentForm.category.value).categoryID,
                description: currentForm.description.value,
                sale: currentForm.sale.value,
            };
            HandleUploadProductImg(
                image,
                Number(currentForm.productID.value),
                `product${Number(currentForm.productID.value)}Img`,
            );
            msgPromise = addProduct(item, jwt);
        } else if (object === 'user') {
            item = {
                userName: currentForm.userName.value,
                password: currentForm.password.value,
                auth: currentForm.auth.checked ? 1 : 0,
                email: currentForm.email.value,
            };
            msgPromise = addUser2(item);
        }
        msgPromise.then((msg) => {
            alert(msg);
            // setDataChange(true);
            handleDataChange();
        });
    };

    const HandleUpdateProduct = () => {
        const currentForm = formRef.current;
        let item;
        let msgPromise;
        if (object === 'product') {
            const image = currentForm.image.files[0];
            item = {
                stock: Number(currentForm.stock.value),
                name: currentForm.name.value,
                favorite: currentForm.favorite.checked ? 1 : 0,
                brandID: getBrandByName(currentForm.brand.value).brandID,
                price: Number(currentForm.price.value),
                categoryID: getCateByName(currentForm.category.value).categoryID,
                description: currentForm.description.value,
                sale: currentForm.sale.value,
            };
            image &&
                HandleUploadProductImg(
                    image,
                    Number(currentForm.productID.value),
                    `product${Number(currentForm.productID.value)}Img`,
                );
            msgPromise = updateProductById(Number(currentForm.productID.value), item, jwt);
        } else if (object === 'user') {
            item = {
                userName: currentForm.userName.value,
                password: currentForm.password.value,
                auth: currentForm.auth.checked ? 1 : 0,
                email: currentForm.email.value,
            };
            msgPromise = updateUserById(Number(currentForm.userID.value), item, jwt);
        }
        msgPromise.then((msg) => {
            alert(msg);
            // setDataChange(true);
            handleDataChange();
        });
    };
    const HandleDeleteProduct = () => {
        let msgPromise;
        if (window.confirm('Xóa item này sẽ xóa những item ở bảng liên quan')) {
            if (object === 'product') {
                msgPromise = deleteProductById(Number(formRef.current.productID.value), jwt);
            } else if (object === 'user') {
                msgPromise = deleteUserById(Number(formRef.current.userID.value), jwt);
            }
            msgPromise.then((msg) => {
                alert(msg);
                // setDataChange(true);
                handleDataChange();
            });
        }
    };

    const HandleSubmit = (e) => {
        e.preventDefault();
        switch (e.nativeEvent.submitter.id) {
            case 'updateBTN':
                HandleUpdateProduct();
                break;
            case 'removeBTN':
                HandleDeleteProduct();
                break;
            case 'addBTN':
                HandleAddItem();
                break;
            default:
                break;
        }
    };
    return (
        <div className={cx('form-wrapper')}>
            <div onClick={() => setShowEditForm(false)} className={cx('form-background')} />
            <form onSubmit={(e) => HandleSubmit(e)} ref={formRef} className={cx('form')}>
                {object === 'product' ? (
                    <div>
                        <label className={cx('label')} htmlFor="productID">
                            Product ID:
                        </label>
                        <input
                            className={cx('input', 'id-input')}
                            defaultValue={data?.productID}
                            type="number"
                            id="productID"
                            name="productID"
                            placeholder="vd:101"
                            required
                            readOnly
                        />
                        <label className={cx('label')} htmlFor="productID">
                            Created at:
                        </label>
                        <input
                            className={cx('input', 'id-input')}
                            defaultValue={data.createdAt}
                            id="createdAt"
                            name="createdAt"
                            placeholder="vd:2023-03-30T14:43:59.803Z"
                            required
                            readOnly
                        />
                        <label className={cx('label')} htmlFor="name">
                            Name:
                        </label>
                        <input
                            className={cx('input')}
                            defaultValue={data.name}
                            type="text"
                            id="name"
                            name="name"
                            required
                            placeholder="vd:latop XYZ100"
                        />
                        <div>
                            <label className={cx('label', 'check-box-label')} htmlFor="favorite">
                                Favorite:
                            </label>
                            <input
                                className={cx('check-box-input')}
                                defaultChecked={data.favorite === 1}
                                type="checkbox"
                                id="favorite"
                                name="favorite"
                            ></input>
                        </div>
                        <label className={cx('label')} htmlFor="stock">
                            Stock:
                        </label>
                        <input
                            className={cx('input')}
                            defaultValue={data.stock}
                            type="number"
                            id="stock"
                            name="stock"
                            required
                            placeholder="vd:100"
                        />
                        <label className={cx('label')} htmlFor="sale">
                            Sale:
                        </label>
                        <input
                            className={cx('input')}
                            defaultValue={data.sale}
                            type="text"
                            id="sale"
                            name="sale"
                            placeholder="vd:10%"
                        />
                        <label className={cx('label')} htmlFor="image">
                            {`Image: ${data.image}.jpg`}
                        </label>
                        <input
                            className={cx('input-file')}
                            type="file"
                            id="image"
                            name="image"
                            // required
                            placeholder="vd:abc.com"
                        />
                        <label className={cx('label')} htmlFor="brand">
                            Brand:
                        </label>
                        <DropdownList
                            defaultValue={getBrandById(data.brandID)?.brandName}
                            data={brandNames}
                            placeholder="Chọn brand"
                            id="brand"
                            name="brand"
                        />
                        <label className={cx('label')} htmlFor="price">
                            Price:
                        </label>
                        <input
                            className={cx('input')}
                            defaultValue={data.price}
                            type="number"
                            id="price"
                            name="price"
                            required
                            placeholder="vd:1000"
                        />
                        <label className={cx('label')} htmlFor="category">
                            Category:
                        </label>
                        <DropdownList
                            defaultValue={getCateById(data.categoryID)?.categoryName}
                            data={cateNames}
                            placeholder="Chọn category"
                            id="category"
                            name="category"
                        />
                        <label className={cx('label')} htmlFor="description">
                            Description:
                        </label>
                        <input
                            className={cx('input')}
                            defaultValue={data.description}
                            type="text"
                            id="description"
                            name="description"
                            required
                            placeholder="vd:laptop nay cuc manh "
                        />
                    </div>
                ) : (
                    <div>
                        <label className={cx('label')} htmlFor="userID">
                            User ID:
                        </label>
                        <input
                            className={cx('input', 'id-input')}
                            defaultValue={data.userID}
                            type="number"
                            id="userID"
                            name="userID"
                            placeholder="vd:101"
                            required
                            readOnly
                        />
                        <label className={cx('label')} htmlFor="userID">
                            Created at:
                        </label>
                        <input
                            className={cx('input', 'id-input')}
                            defaultValue={data.createdAt}
                            id="createdAt"
                            name="createdAt"
                            placeholder="vd:2023-03-30T14:43:59.803Z"
                            required
                            readOnly
                        />
                        <label className={cx('label')} htmlFor="userName">
                            User Name:
                        </label>
                        <input
                            className={cx('input')}
                            defaultValue={data.userName}
                            type="text"
                            id="userName"
                            name="userName"
                            required
                            placeholder="vd: VeryHandsome123"
                        />
                        <label className={cx('label')} htmlFor="password">
                            Password:
                        </label>
                        <input
                            className={cx('input')}
                            defaultValue={data.password}
                            id="password"
                            name="password"
                            required
                            placeholder="vd:100"
                        />
                        <div>
                            <label className={cx('label', 'check-box-label')} htmlFor="auth">
                                ADMIN:
                            </label>
                            <input
                                className={cx('check-box-input')}
                                defaultChecked={data.auth === 1}
                                type="checkbox"
                                id="auth"
                                name="auth"
                            ></input>
                        </div>
                        <label className={cx('label')} htmlFor="email">
                            Email:
                        </label>
                        <input
                            className={cx('input')}
                            defaultValue={data.email}
                            type="email"
                            id="email"
                            name="email"
                            placeholder="vd:abc@example.com"
                        />
                    </div>
                )}
                {formType === 'UpdateRemove' ? (
                    <div className={cx('button-wrapper')}>
                        <button id="updateBTN" className={cx('update-button', 'button')}>
                            SỬA
                        </button>
                        <button id="removeBTN" className={cx('delete-button', 'button')}>
                            XÓA
                        </button>
                    </div>
                ) : (
                    <div className={cx('button-wrapper')}>
                        <button id="addBTN" className={cx('add-button', 'button')}>
                            THÊM
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default HandleForm;
