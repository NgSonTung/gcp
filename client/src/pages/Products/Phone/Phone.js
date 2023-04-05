import classNames from 'classnames/bind';
import style from './Phone.module.scss';
import { postUrlFileImage } from '~/functions/SubImgFetch';
import { useState } from 'react';
import { useEffect } from 'react';
const cx = classNames.bind(style);
function Phone() {
    const [selectedFile, setSelectedFile] = useState(null);
    // const [listImage,setListImage] = useState(null)

    const handleFile = async (event, folderImage = 'productImages', productID, alt) => {
        setSelectedFile(event.target.files[0]); // hien thi nguoc lai fe
        const filename = event.target.files[0].name;
        console.log(event.target.files[0]);
        const fileBlob = new Blob([event.target.files[0]]);
        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);
        reader.onloadend = async () => {
            await postUrlFileImage(reader.result.split(',')[1], folderImage, filename, 1, (alt = `image${productID}`));
        };
    };
    const handleSend = async () => {};

    useEffect(() => {
        handleSend();
    }, [selectedFile]);
    return (
        <div>
            <input type="file" accept="image/*" onChange={(e) => handleFile(e)} className={cx('input-file')} />
            <div>
                <img src={selectedFile && URL.createObjectURL(selectedFile)} alt="Selected file" />
            </div>
        </div>
    );
}

export default Phone;
