import client from './client';

export async function signUp({ name, email, password }) {
  const response = await client.post<SignUpSuccess>('/auth/signup', {
    name,
    email,
    password,
  });

  return response.data;
}

export interface SignUpSuccess {
  success: boolean;
  message: string;
}

export interface SignUpFail {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
}
