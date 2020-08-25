import client from './client';

export async function login({ email, password }) {
  const response = await client.post<LoginSuccess>('/auth/login', { email, password });

  return response.data;
}

export interface LoginSuccess {
  accessToken: string;
  tokenType: string;
}
