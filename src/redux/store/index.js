import { createStore, combineReducers } from 'redux';
import ProductReducer from '../reducers/ProductReducer';
import UserReducer from '../reducers/UserReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: 'ProductReducer',
};

const root = combineReducers({
    ProductReducer,
    UserReducer,
});

const persistedReducer = persistReducer(persistConfig, root);

const store = createStore(persistedReducer);
export const persistor = persistStore(store);
export default store;
