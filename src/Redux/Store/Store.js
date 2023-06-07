import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; 
import { persistReducer, persistStore } from 'redux-persist';
import phonebookReducer from "Redux/Reducers/phonebookSlice";

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, phonebookReducer);

export const store = configureStore({
  reducer: {
    phonebook: persistedReducer,
  },
});

export const persistor = persistStore(store);