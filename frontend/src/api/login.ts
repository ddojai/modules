import client from './client';

export async function login({ email, password }: LoginProps) {
  const response = await client.post<LoginSuccess>('/auth/login', { email, password });

  return response.data;
}

interface LoginProps {
  email: string;
  password: string;
}

export interface LoginSuccess {
  accessToken: string;
  tokenType: string;
}
