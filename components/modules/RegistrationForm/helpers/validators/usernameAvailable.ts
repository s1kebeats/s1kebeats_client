import fetchUsernameAvailability from '../../api/fetchUsernameAvailability';

export default async function usernameAvailable(
  param: string
): Promise<boolean> {
  const availability = await fetchUsernameAvailability(param);
  return availability;
}
