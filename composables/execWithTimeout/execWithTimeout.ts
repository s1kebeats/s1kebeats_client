export default async function (promise: Promise<unknown>, timeout: number) {
  const timeoutPromise = new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
  const res = await Promise.all([promise, timeoutPromise]);
  return res[0];
}
