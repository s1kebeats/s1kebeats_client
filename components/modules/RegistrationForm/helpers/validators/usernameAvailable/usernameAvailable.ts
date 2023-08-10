import { fetchUsernameAvailability } from '@/components/modules/RegistrationForm/api';

export default async function usernameAvailable(
  param: string
): Promise<boolean> {
  const availability = await fetchUsernameAvailability(param);
  return availability;
}
