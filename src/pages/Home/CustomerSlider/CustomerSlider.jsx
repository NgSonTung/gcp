import ImageSlider from '../../../components/ImageSlider/ImageSlider';
const CustomerSlider = () => {
    const images = [
        { url: 'https://thanhmobile.vn/uploads/plugin/gallery/180/nh-khach-hang-11-4.jpg', id: '1', alt: 'KH1' },
        {
            url: 'https://thanhmobile.vn/uploads/plugin/gallery/182/nh-khach-hang-13-6.jpg',
            id: '2',
            alt: 'KH2',
        },
        { url: 'https://thanhmobile.vn/uploads/plugin/gallery/181/nh-khach-hang-12-5.jpg', id: '3 ', alt: 'KH3' },
        {
            url: 'https://thanhmobile.vn/uploads/plugin/gallery/172/nh-khach-hang-7-z3751164352388-38423d4ad3155197cba02fdb0e2efce3.jpg',
            id: '4',
            alt: 'KH4',
        },
        { url: 'https://thanhmobile.vn/uploads/plugin/gallery/180/nh-khach-hang-11-4.jpg', id: '1', alt: 'KH1' },
        {
            url: 'https://thanhmobile.vn/uploads/plugin/gallery/182/nh-khach-hang-13-6.jpg',
            id: '2',
            alt: 'KH2',
        },
    ];

    return (
        <div>
            <ImageSlider images={images} itemAspectRatio={'1'} swiperWidth={'80%'} />
        </div>
    );
};

export default CustomerSlider;
