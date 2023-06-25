import classNames from 'classnames/bind';
import styles from './CustomerSlider.module.scss';
import { customerSlidersImg } from '~/data';
import ImageSlider from '~/components/ImageSlider/ImageSlider';

const CustomerSlider = () => {
    return (
        <div>
            <ImageSlider images={customerSlidersImg} type={'customer'} />
        </div>
    );
};

export default CustomerSlider;
