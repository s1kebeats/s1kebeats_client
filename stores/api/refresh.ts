import axios from 'axios';
import AuthResponse from '@/api/models/AuthResponse';

export default async function refresh() {
  const runtimeConfig = useRuntimeConfig();
  const response = await axios.post<AuthResponse>(
    `${runtimeConfig.public.API_URL}/refresh`,
    null,
    {
      withCredentials: true,
    }
  );
  return response;
}
