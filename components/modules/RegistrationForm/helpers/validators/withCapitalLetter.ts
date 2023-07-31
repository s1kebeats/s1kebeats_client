export default function withCapitalLetter(param: string): boolean {
  const INCLUDE_UPPECASE = /[A-Z]/;
  return INCLUDE_UPPECASE.test(param);
}
