import axios, { type AxiosResponse } from 'axios';
import { type LogoutResponseBody } from '@/api/models/responseBodies';

export default async function refresh(): Promise<
  AxiosResponse<LogoutResponseBody>
> {
  const runtimeConfig = useRuntimeConfig();
  const response = await axios.post<LogoutResponseBody>(
    `${runtimeConfig.public.API_URL}/logout`,
    null,
    {
      withCredentials: true,
    }
  );
  return response;
}
