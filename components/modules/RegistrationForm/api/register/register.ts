import { type RegisterRequestBody } from '@/api/models/requestBodies';
import { type RegisterResponseBody } from '@/api/models/responseBodies';
import axios, { type AxiosResponse } from 'axios';

export default async function register(
  data: RegisterRequestBody
): Promise<AxiosResponse<RegisterResponseBody>> {
  const runtimeConfig = useRuntimeConfig();
  const response = await axios.post<RegisterResponseBody>(
    `${runtimeConfig.public.API_URL}/register`,
    data
  );
  return response;
}
