import { createStore, combineReducers } from 'redux';
import LocationReducer from '../reducers/LocationReducer';
import ProductReducer from '../reducers/ProductReducer';
import UserReducer from '../reducers/UserReducer';
import CartReducer from '../reducers/CartReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
<<<<<<< HEAD
    blacklist: ['ProductReducer', 'LocationReducer'],
=======
    blacklist: ['LocationReducer', 'CartReducer'],
>>>>>>> fa029ef2920e4445490bb54a9fd707f7e2ca3acc
};

const root = combineReducers({
    ProductReducer,
    UserReducer,
    LocationReducer,
    CartReducer,
});

const persistedReducer = persistReducer(persistConfig, root);

const store = createStore(persistedReducer);
export const persistor = persistStore(store);
export default store;
