import { combineReducers } from 'redux';
import userReducer from './user/userReducer';
import jobReducer from './jobs/jobReducer';


export const rootReducer = combineReducers({
  user: userReducer,
  job: jobReducer,
});