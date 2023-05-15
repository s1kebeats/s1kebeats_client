import axios from 'axios';

export default async function fetchUsernameAvailability(
  username: string
): Promise<boolean> {
  const runtimeConfig = useRuntimeConfig();
  const { data } = await axios.get<{ available: boolean }>(
    `${runtimeConfig.public.API_URL}/checkusername/${username}`
  );
  return data.available;
}
