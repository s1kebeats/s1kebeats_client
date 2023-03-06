import fetchUsernameAvailability from '../../api/fetchUsernameAvailability';

export default async function usernameAvailable(
  param: string
): Promise<boolean> {
  const available = await fetchUsernameAvailability(param);
  return available;
}
