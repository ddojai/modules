import { combineReducers } from 'redux';
import login, { loginSaga } from './login';
import signUp, { signUpSaga } from './signUp';
import user, { userSaga } from './user';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({
  login,
  signUp,
  user
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga() {
  yield all([loginSaga(), signUpSaga(), userSaga()]);
}
