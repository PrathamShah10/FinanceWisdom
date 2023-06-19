import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';

const configureReducer = () => {
  const store = configureStore({
    reducer: rootReducer,
    devTools: true,
  });
  return store;
};

export const store = configureReducer();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { configureReducer };
