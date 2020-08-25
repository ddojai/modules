import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'modules';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { signUpThunk } from 'modules/signUp/thunks';

export default function useSignUp() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const signUpResponse = useSelector((state: RootState) => state.signUp.signUpResponse);
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
    // todo : check password, passwordConfirm
    dispatch(
      signUpThunk({
        name: form.name,
        email: form.email,
        password: form.password,
      })
    );
  };

  // 컴포넌트가 처음 렌더링될 때 form을 초기화함
  useEffect(() => {
    setForm({
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    });
  }, []);

  return {
    form,
    signUpResponse,
    onChange,
    onSubmit,
  };
}
