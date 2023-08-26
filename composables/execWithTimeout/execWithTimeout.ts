export default async function (cb: Function, timeout: number) {
  const timeoutPromise = new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
  const res = await Promise.all([cb(), timeoutPromise]);
  return res[0];
}
