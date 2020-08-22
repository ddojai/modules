import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'modules';
import { changeField, initializeForm } from 'modules/signUp';
import { ChangeEvent, FormEvent, useEffect } from 'react';

export default function useSignUp() {
  const dispatch = useDispatch();
  const signUp = useSelector((state: RootState) => state.signUp);

  // 인풋 변경 이벤트 핸들러
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        key: name,
        value,
      })
    );
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    // 구현 예정
  };

  // 컴포넌트가 처음 렌더링될 때 form을 초기화함
  useEffect(() => {
    dispatch(initializeForm())
  }, [dispatch]);

  return {
    signUp,
    onChange,
    onSubmit,
  };
}
