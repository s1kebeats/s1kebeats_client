export default async function fetchUsernameAvailability(
  username: string
): Promise<boolean> {
  const runtimeConfig = useRuntimeConfig();
  const { available } = await $fetch<{ available: boolean }>(
    `${runtimeConfig.public.API_URL as string}/checkusername/${username}`
  );
  return available;
}
