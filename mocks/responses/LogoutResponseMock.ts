import { LogoutResponseBody } from '@/api/models/responseBodies';
import LogoutResponseBodyMock from '@/mocks/responseBodies/LogoutResponseBodyMock';

const LogoutResponseMock: {
  statusCode: number;
  data: LogoutResponseBody;
} = {
  statusCode: 200,
  data: LogoutResponseBodyMock,
};
export default LogoutResponseMock;
