import { combineReducers } from 'redux';
import login from './login';
import { loginSaga } from './login/sagas';
import signUp, { signUpSaga } from './signUp';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({
  login,
  signUp,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga() {
  yield all([loginSaga(), signUpSaga()]);
}
