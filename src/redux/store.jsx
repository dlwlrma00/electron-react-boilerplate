import { createStore, applyMiddleware } from "redux";
// import reducer from "./reducer";
// import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";
import reducer from './reducers/index'
import { persistStore, persistReducer } from 'redux-persist'
import localforage from 'localforage';

const middleware = [thunk];

const persistConfig = {
    key: 'root',
    storage : localforage,
    timeout: null
}
  
const persistedReducer = persistReducer(persistConfig, reducer)

const store = createStore(
    persistedReducer,
    applyMiddleware(...middleware)
);

let persistor = persistStore(store)


export {store, persistor};
