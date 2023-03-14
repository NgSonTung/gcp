// cre : https://github.com/Ahmed-Elswerky/react-flying-item
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import products from '~/data/products';
const DEFAULT_TARGET_TOP = '5%',
    DEFAULT_TARGET_LEFT = '5%',
    DEFAULT_ANIMATION_DURATION = 0.9,
    DEFAULT_ITEM_STYLING = { borderRadius: '4rem', width: '8rem' },
    DEFAULT_DATA_HOVER = '',
    DEFAULT_CLASSNAME_FOR_BTN = '';

export default function FlyingButton(props) {
    const {
        src = '',
        children,
        productId,
        dataHover = DEFAULT_DATA_HOVER,
        classForBtn = DEFAULT_CLASSNAME_FOR_BTN,
        targetTop = DEFAULT_TARGET_TOP,
        targetLeft = DEFAULT_TARGET_LEFT,
        customAnimation = '',
        animationDuration = DEFAULT_ANIMATION_DURATION,
        flyingItemStyling = DEFAULT_ITEM_STYLING,
    } = props;
    const productById = products.find((item) => item.productId === productId);

    const flyingImage = useRef(null);
    const initFlight = (e) => {
        flyingImage.current.style.setProperty('--target-position-x', e.clientX + 'px');
        flyingImage.current.style.setProperty('--target-position-y', e.clientY + 'px');
        flyingImage.current.style.setProperty('display', '');
        flyingImage.current.src = src;
        setTimeout(() => flyingImage.current.style.setProperty('display', 'none'), animationDuration * 1000 - 100);
    };
    //handler click
    const dispatch = useDispatch();
    const cartItem = useSelector((state) => state.CartReducer);
    // console.log('cartItem', cartItem);
    const handlerClick = (e) => {
        initFlight(e);
        const action = {
            type: 'ADD_TO_CART',
            payload: productById,
        };
        dispatch(action);
    };

    const baseStyle = `
    .flying_image {
      --target-position-x: 0px;
      --target-position-y: 0px;
    
      display: block;
      position: fixed;
      top: var(--target-position-y);
      left: var(--target-position-x);
      translate: -50% -50%;
      animation: fly ${animationDuration}s 1;
    }
    @keyframes fly {
      0% {
        top: var(--target-position-y);
        left: var(--target-position-x);
        opacity: 1;
      }
      ${customAnimation}
      100% {
        top: ${targetTop};
        left: ${targetLeft};
        opacity: 0;
      }
    }
  `;

    return (
        <div>
            <style>{baseStyle}</style>
            <button onClick={(e) => handlerClick(e)} data-hover={dataHover} className={classForBtn}>
                {children}
            </button>
            <img
                src=""
                alt=""
                className="flying_image"
                style={{
                    display: 'none',
                    ...DEFAULT_ITEM_STYLING,
                    ...flyingItemStyling,
                }}
                ref={flyingImage}
            />
        </div>
    );
}
