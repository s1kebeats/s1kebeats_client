import { type ActivateResponseBody } from '@/api/models/responseBodies';
import axios, { type AxiosResponse } from 'axios';

export default async function activate(
  activationCode: string
): Promise<AxiosResponse<ActivateResponseBody>> {
  const runtimeConfig = useRuntimeConfig();
  const response = await axios.post<ActivateResponseBody>(
    `${runtimeConfig.public.API_URL}/activate/${activationCode}`
  );
  return response;
}
