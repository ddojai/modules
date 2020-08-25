import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'modules';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { signUpAsync } from 'modules/signUp';

export default function useSignUp() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const signUpResponse = useSelector(
    (state: RootState) => state.signUp.signUpResponse
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
    const { name, email, password, passwordConfirm } = form;
    if (password !== passwordConfirm) {
      // TODO: 오류 처리
      console.log('패스워드 불일치');
      return;
    }
    dispatch(
      signUpAsync.request({
        name,
        email,
        password,
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

  // 회원가입 성공/실패 처리
  useEffect(() => {
    const { error, data } = signUpResponse;
    if (error) {
      console.log('오류 발생');
      console.log(signUpResponse.error);
      return;
    }
    if (data) {
      console.log('회원가입 성공');
      console.log(data);
    }
  }, [signUpResponse]);

  return {
    form,
    signUpResponse,
    onChange,
    onSubmit,
  };
}
