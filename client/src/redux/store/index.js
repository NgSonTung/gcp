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
    blacklist: 'LocationReducer',
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
