import axios, { type AxiosResponse } from 'axios';
import { type AuthResponseBody } from '@/api/models/responseBodies';

export default async function refresh(): Promise<AxiosResponse<AuthResponseBody>> {
  const response = await axios.post<AuthResponseBody>(
    `${process.env.API_URL}/refresh`,
    null,
    {
      withCredentials: true,
    }
  );
  return response;
}
