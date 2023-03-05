import AuthResponse from '@/api/models/AuthResponse';
import axios from 'axios';

export default async function login(
  username: string,
  password: string,
  refresh: boolean
) {
  const runtimeConfig = useRuntimeConfig();
  const response = await axios.post<AuthResponse>(
    `${runtimeConfig.public.API_URL}/login`,
    {
      username,
      password,
      refresh,
    },
    {
      withCredentials: true,
    }
  );
  return response;
}
