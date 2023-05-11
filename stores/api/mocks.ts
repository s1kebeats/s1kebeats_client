const runtimeConfigMock = {
  public: {
    API_URL: 'http://192.168.1.135:5000/api',
    MEDIA_URL: 'http://192.168.1.135:5000/api/media/',
  },
};
const authResponseMock = {
  accessToken: 'token',
  user: {
    email: 'email@example.com',
    username: 'username',
    id: 1,
    image: null,
    displayedName: null,
  },
};

export { runtimeConfigMock, authResponseMock };
