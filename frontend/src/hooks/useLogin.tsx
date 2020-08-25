import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'modules';
import { loginThunk } from 'modules/login';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

export default function useLogin() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const loginResponse = useSelector((state: RootState) => state.login.loginResponse);
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
    dispatch(loginThunk({ email: form.email, password: form.password }));
  };

  // 컴포넌트가 처음 렌더링될 때 form을 초기화함
  useEffect(() => {
    setForm({
      email: '',
      password: '',
    });
  }, []);

  return {
    form,
    loginResponse,
    onChange,
    onSubmit,
  };
}
