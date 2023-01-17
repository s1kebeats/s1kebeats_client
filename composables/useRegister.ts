export default async function (
  email: string,
  username: string,
  password: string
) {
  //   const baseUrl = process.env.API_URL ?? 'http://localhost:5000';
  const baseUrl = 'http://localhost:5000/api';
  const { data, error } = await useFetch(`${baseUrl}/register`, {
    method: 'POST',
    body: {
      email,
      username,
      password,
    },
  });
  if (error.value) throw error.value;
  return data;
}
