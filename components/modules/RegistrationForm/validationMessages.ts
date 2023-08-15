const validationMessages = {
  required: 'Заполните поля',
  username: {
    nonempty: 'Введите имя пользователя',
    noSpecialChars: 'Введите имя пользователя без спец. символов',
    available: 'Имя пользователя занято',
  },
  email: {
    nonempty: 'Введите электронную почту',
    valid: 'Введите настоящую электронную почту',
  },
  password: {
    nonempty: 'Введите пароль',
    min: 'Минимальная длина пароля: 8 символов',
    withDigit: 'Пароль должен содержать цифру',
    withCapitalLetter: 'Пароль должен содержать заглавную букву',
  },
  passwordConfirm: {
    nonempty: 'Введите пароль еще раз',
    match: 'Пароли не совпадают',
  },
};

export default validationMessages;
