// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import userReducer from '@/reducers/userReducer';
import cartReducer from '@/reducers/cartReducer';

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer
});

const persistConfig = {
	key: 'root',
	storage,
	whitelist:['user', 'cart'] //permite salvar no persistor
};

// Configuração do Redux Persist com persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	// Desabilita a checagem de valores não serializáveis
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ['persist/PERSIST'], // Ignora as ações persist/PERSIST
				ignoredPaths: ['persistedReducer'], // Ignora o persistState
			},
		}),
	
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;