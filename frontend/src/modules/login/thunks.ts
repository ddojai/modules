import { ThunkAction } from 'redux-thunk';
import { RootState } from 'modules';
import { LoginAction } from './types';
import { login } from 'api/login';
import { loginAsync } from './actions';

export function loginThunk({
  email,
  password,
}): ThunkAction<Promise<void>, RootState, null, LoginAction> {
  return async (dispatch) => {
    const { request, success, failure } = loginAsync;
    dispatch(request());
    try {
      const loginSuccess = await login({ email, password });
      dispatch(success(loginSuccess));
    } catch (e) {
      dispatch(failure(e));
    }
  };
}
