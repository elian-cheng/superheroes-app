import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice';
import heroReducer from './heroSlice';
import { modalAPI } from './modalAPI';

const store = configureStore({
  reducer: {
    [modalAPI.reducerPath]: modalAPI.reducer,
    form: formReducer,
    heroes: heroReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(modalAPI.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
