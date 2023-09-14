import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { logger } from "redux-logger";
import { rootReducer } from "./root-reducer";

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

// .filter(Boolena) removes anything from an array that is false or falsy.
const middleWares = [process.env.NODE_ENV === 'development' && logger].filter(Boolean);

// composed enhancer is true when the application is not in production, there is a window object and Redux Devtools are installed in a Chrome browser.
const composedEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX__DEVTOOLS_EXTENSION__COMPOSE__) || compose;

const composedEnhancers = composedEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);
