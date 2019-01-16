import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// allows use of Redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedReducer = persistReducer({ key: 'root', storage }, rootReducer);

export const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunkMiddleware))
);
export const persistor = persistStore(store);
