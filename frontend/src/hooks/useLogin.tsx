import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'modules';
import { loginAsync } from 'modules/login';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { userAsync, goToHome } from 'modules/user';

export default function useLogin() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const loginResponse = useSelector(
    (state: RootState) => state.login.loginResponse
  );
  const userMeResponse = useSelector(
    (state: RootState) => state.user.userMeResponse
  );
  const dispatch = useDispatch();

  // 인풋 변경 이벤트 핸들러
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { email, password } = form;
    dispatch(loginAsync.request({ email, password }));
  };

  // 컴포넌트가 처음 렌더링될 때 form을 초기화함
  useEffect(() => {
    setForm({
      email: '',
      password: '',
    });
  }, []);

  useEffect(() => {
    const { error, data } = loginResponse;
    if (error) {
      console.log('오류 발생');
      console.log(error);
      return;
    }
    if (data) {
      console.log('로그인 성공');
      dispatch(userAsync.request(data.accessToken));
    }
  }, [dispatch, loginResponse]);

  useEffect(() => {
    const { data } = userMeResponse;
    if (data) {
      dispatch(goToHome());
    }
  }, [dispatch, userMeResponse]);

  return {
    form,
    loginResponse,
    onChange,
    onSubmit,
  };
}
