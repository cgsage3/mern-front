import { combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
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
import { api } from './api/api';
import CoreReducer from './core/CoreReducer';
import AuthReducer from './auth/AuthReducer';
import UserReducer from './user/UserReducer';

const appReducer = combineReducers({
	auth: AuthReducer,
	core: CoreReducer,
	user: UserReducer,
	[api.reducerPath]: api.reducer,
});

const rootReducer = (state, action) => {
	if (action.type === 'AuthReducer/logout') {
		storage.removeItem('persist:root');
		return appReducer(undefined, action);
	}
	return appReducer(state, action);
};

const persistConfig = {
	key: 'root',
	version: 1,
	storage: storage,
	blacklist: ['api'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const reduxLogger = createLogger();

const configureCustomStore = () => {
	const store = configureStore({
		reducer: persistedReducer,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(api.middleware, reduxLogger),
		devTools: process.env.NODE_ENV !== 'production',
	});
	const persistor = persistStore(store);
	return { store, persistor };
};

export default configureCustomStore();

export const { store, persistor } = configureCustomStore();
