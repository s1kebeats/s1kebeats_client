import { type AuthResponseBody } from '@/api/models/responseBodies';
import { LoginRequestBody } from '@/api/models/requestBodies';
import axios from 'axios';

export default async function login(data: LoginRequestBody) {
  const response = await axios.post<AuthResponseBody>(
    `${process.env.API_URL}/login`,
    data,
    {
      withCredentials: true,
    }
  );
  return response;
}
