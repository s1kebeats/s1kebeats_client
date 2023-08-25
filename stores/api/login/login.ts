import { type AuthResponseBody } from '@/api/models/responseBodies';
import { type LoginRequestBody } from '@/api/models/requestBodies';
import axios, { type AxiosResponse } from 'axios';

export default async function login(
  data: LoginRequestBody
): Promise<AxiosResponse<AuthResponseBody>> {
  const runtimeConfig = useRuntimeConfig();
  const response = await axios.post<AuthResponseBody>(
    `${runtimeConfig.public.API_URL}/login`,
    data,
    {
      withCredentials: true,
    }
  );
  return response;
}
