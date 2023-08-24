import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user';
import visualReducer from './visual';
const appReducer = combineReducers({
  user: userReducer,
  visual: visualReducer,
});

export default appReducer;
