import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice';
import heroReducer from './heroSlice';
import { chosenHeroAPI } from './chosenHeroAPI';

const store = configureStore({
  reducer: {
    [chosenHeroAPI.reducerPath]: chosenHeroAPI.reducer,
    form: formReducer,
    heroes: heroReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(chosenHeroAPI.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
