import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'modules';
import { logout } from 'modules/user';

export default function useHeader() {
  const userMeResponse = useSelector(
    (state: RootState) => state.user.userMeResponse
  );
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
  }

  return {
    userMeResponse,
    onLogout,
  };
}
