import { ThunkAction } from 'redux-thunk';
import { RootState } from 'modules';
import { SignUpAction } from './types';
import { signUp } from 'api/signUp';
import { signUpAsync } from './actions';

export function signUpThunk({
  name,
  email,
  password,
}): ThunkAction<Promise<void>, RootState, null, SignUpAction> {
  return async (dispatch) => {
    const { request, success, failure } = signUpAsync;
    dispatch(request());
    try {
      const signUpSuccess = await signUp({ name, email, password });
      dispatch(success(signUpSuccess));
    } catch (e) {
      dispatch(failure(e));
    }
  };
}
