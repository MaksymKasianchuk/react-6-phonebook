import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import phonebookReducer from './phonebook/phonebook-reducers';

const middleware = [
    ...getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
    }),
    logger,
];

const contactsPersistConfig = {
    key: 'contacts',
    storage,
    blacklist: ['filter'],
};

const store = configureStore({
    reducer: {
        phonebook: persistReducer(contactsPersistConfig, phonebookReducer),
    },
    middleware,
    devTools: process.env.NODE_ENV === 'development',
});

const persistor = persistStore(store);

// eslint-disable-next-line import/no-anonymous-default-export
export default { store, persistor };