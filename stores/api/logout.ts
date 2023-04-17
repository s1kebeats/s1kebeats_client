import axios, { type AxiosResponse } from 'axios';
import type AuthResponse from '@/api/models/AuthResponse';

export default async function refresh(): Promise<AxiosResponse<AuthResponse>> {
  const runtimeConfig = useRuntimeConfig();
  const response = await axios.post<AuthResponse>(
    `${runtimeConfig.public.API_URL}/logout`,
    null,
    {
      withCredentials: true,
    }
  );
  return response;
}
