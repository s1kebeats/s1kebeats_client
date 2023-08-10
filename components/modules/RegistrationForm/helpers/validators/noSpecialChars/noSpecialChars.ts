export default function noSpecialChars(param: string): boolean {
  const NO_SPECIAL_CHARS = /^[A-Za-z0-9]*$/;
  return NO_SPECIAL_CHARS.test(param);
}
