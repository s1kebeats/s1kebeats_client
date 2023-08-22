import { RegisterRequestBody } from 'api/models/requestBodies';
import { RegisterResponseBody } from 'api/models/responseBodies';
import axios, { type AxiosResponse } from 'axios';

export default async function register(
  data: RegisterRequestBody
): Promise<AxiosResponse<RegisterResponseBody>> {
  const response = await axios.post<RegisterResponseBody>(
    `${process.env.API_URL}/register`,
    data
  );
  return response;
}
