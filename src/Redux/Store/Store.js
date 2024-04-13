import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from "redux"; 
import { IrctcReducer } from "../../Reducer/IrctcReducer"; 

export const CommonReducer = combineReducers({
  Irctc: IrctcReducer,
});
const persistConfig = {
  key: 'root',
  storage
};
const persistedReducer = persistReducer(persistConfig, CommonReducer); 
export const store = createStore(persistedReducer);
export const persistor = persistStore(store);




