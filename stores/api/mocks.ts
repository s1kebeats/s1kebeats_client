const runtimeConfigMock = {
  public: {
    API_URL: 'http://192.168.1.135:5000/api',
    MEDIA_URL: 'http://192.168.1.135:5000/api/media/',
  },
};
const loggedUserMock = {
  email: 'email@example.com',
  username: 'username',
  id: 1,
  image: null,
  displayedName: null,
};
const authResponseMock = {
  accessToken: 'token',
  user: loggedUserMock,
};

export { runtimeConfigMock, loggedUserMock, authResponseMock };
