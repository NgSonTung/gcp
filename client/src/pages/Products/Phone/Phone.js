import classNames from 'classnames/bind';
import style from './Phone.module.scss';
import { postUrlFileImage } from '~/functions/SubImgFetch';
import { useState } from 'react';
import { useEffect } from 'react';
const cx = classNames.bind(style);
function Phone() {
    const [selectedFile, setSelectedFile] = useState(null);
    // const [listImage,setListImage] = useState(null)

    const handleFile = async (event) => {
        setSelectedFile(event.target.files[0]);
        const fileBlob = new Blob([event.target.files[0]]);

        // Convert the Blob object to a base64 string
        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);
        reader.onloadend = async () => {
            // console.log('reader.result', reader.result);
            const infor = { blob: reader.result.split(',')[1], folderImage: 'subImgimages', imageName: 'test' };
            await postUrlFileImage(infor);
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
