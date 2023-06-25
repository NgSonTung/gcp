const initialSate = {
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
};
const LocationReducer = (state = initialSate, action) => {
    switch (action.type) {
        case 'GET_LOCATION': {
            return {
                top: action.payload.top,
                bottom: action.payload.bottom,
                right: action.payload.right,
                left: action.payload.left,
            };
        }
        default:
            return state;
    }
};
export default LocationReducer;
