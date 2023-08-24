const validationMessages = {
  username: {
    required: 'Введите имя пользователя',
    noSpecialChars: 'Введите имя пользователя без спец. символов',
    available: 'Имя пользователя занято',
  },
  email: {
    required: 'Введите электронную почту',
    valid: 'Введите настоящую электронную почту',
  },
  password: {
    required: 'Введите пароль',
    min: 'Минимальная длина пароля: 8 символов',
    withDigit: 'Пароль должен содержать цифру',
    withCapitalLetter: 'Пароль должен содержать заглавную букву',
  },
  passwordConfirm: {
    required: 'Введите пароль еще раз',
    match: 'Пароли не совпадают',
  },
};

export default validationMessages;
