import client from './client';

export async function signUp({ name, email, password }: SignUpProps) {
  const response = await client.post<SignUpSuccess>('/auth/signup', {
    name,
    email,
    password,
  });

  return response.data;
}

interface SignUpProps {
  name: string;
  email: string;
  password: string;
}

export interface SignUpSuccess {
  success: boolean;
  message: string;
}

/*
export interface SignUpFail {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
}
*/