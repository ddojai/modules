import { combineReducers } from 'redux';
import login from './login';
import signUp from './signUp';

const rootReducer = combineReducers({
  login,
  signUp,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;