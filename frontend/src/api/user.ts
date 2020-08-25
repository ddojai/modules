import client from './client';

export async function userMe(accessToken: string) {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  const response = await client.get<UserMeSuccess>('/user/me', config);

  return response.data;
}

export interface UserMeSuccess {
  id: number;
  name: string;
  email: string;
  imageUrl: string | null;
  emailVerified: boolean;
  provider: string;
  providerId: string | null;
}
