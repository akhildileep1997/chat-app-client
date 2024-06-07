import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userSlice from './slice/userSlice';
import messageSlice from './slice/messageSlice';
import socketSlice from './slice/socketSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";


const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  user: userSlice,
  message: messageSlice,
  socket: socketSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);



const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export default store