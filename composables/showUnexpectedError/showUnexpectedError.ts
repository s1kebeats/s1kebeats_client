const unexpectedErrorMessage =
  'Произошла непредвиденная ошибка, пожалуйста перезагрузите страницу.';
export { unexpectedErrorMessage };
export default function (error: any) {
  showError({
    statusCode: error.response?.status ? error.response.status : 500,
    message: unexpectedErrorMessage,
  });
}
