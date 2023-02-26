import classNames from 'classnames/bind';
import styles from './CustomerSlider.module.scss';
import { customerSlidersImg } from '~/data';
import ImageSlider from '~/components/ImageSlider/ImageSlider';

const cx = classNames.bind(styles);

const CustomerSlider = () => {
    return (
        <div>
            <ImageSlider images={customerSlidersImg} />
        </div>
    );
};

export default CustomerSlider;
