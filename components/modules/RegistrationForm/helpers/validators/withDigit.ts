export default function withDIgit(param: string): boolean {
  const INCLUDE_DIGIT = /\d/;
  return INCLUDE_DIGIT.test(param);
}
