import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'modules';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { signUpAsync } from 'modules/signUp';
import { goToLogin, goToHome } from 'modules/user';

export default function useSignUp() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [error, setError] = useState<string | null>(null);
  const signUpResponse = useSelector(
    (state: RootState) => state.signUp.signUpResponse
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
    const { name, email, password, passwordConfirm } = form;
    if ([name, email, password, passwordConfirm].includes('')) {
      setError('빈 칸을 모두 입력하세요.');
      return;
    }
    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      setForm({
        ...form,
        password: '',
        passwordConfirm: '',
      });
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
      // TODO : status 409, 이미 존재하는 email 처리
      // 기타이유
      setError('회원가입 실패');
      return;
    }
    if (data) {
      console.log('회원가입 성공');
      console.log(data);
      // TODO : 여기서 userMe 호출 해서 바로 로그인 처리
      // TODO: login 처럼 userMe 성공시 useEffect로 체크해서 홈화면으로 이동 및 localstorage 저장하도록 수정
      dispatch(goToLogin());
    }
  }, [dispatch, signUpResponse]);

  useEffect(() => {
    const { data } = userMeResponse;
    if (data) {
      dispatch(goToHome());
    }
  }, [dispatch, userMeResponse]);

  return {
    form,
    onChange,
    onSubmit,
    error,
  };
}
