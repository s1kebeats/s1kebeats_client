export default async function fetchUsernameAvailability(username: string) {
  const runtimeConfig = useRuntimeConfig();
  const { available } = await $fetch<{ available: boolean }>(
    `${runtimeConfig.public.API_URL}/checkusername/${username}`
  );
  return available;
}
