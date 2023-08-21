import { type ActivateResponseBody } from '@/api/models/responseBodies';
import axios, { type AxiosResponse } from 'axios';

export default async function activate(
  activationCode: string
): Promise<AxiosResponse<ActivateResponseBody>> {
  const response = await axios.post<ActivateResponseBody>(
    `${process.env.API_URL}/activate/${activationCode}`
  );
  return response;
}
