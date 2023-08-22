import axios from 'axios';

export default async function fetchUsernameAvailability(
  username: string
): Promise<boolean> {
  const { data } = await axios.get<{ available: boolean }>(
    `${process.env.API_URL}/checkusername/${username}`
  );
  return data.available;
}
