import axios, { type AxiosResponse } from 'axios';

export default async function register(
  username: string,
  email: string,
  password: string
): Promise<AxiosResponse> {
  const runtimeConfig = useRuntimeConfig();
  const response = await axios.post(
    `${runtimeConfig.public.API_URL as string}/register`,
    {
      username,
      email,
      password,
    }
  );
  return response;
}
