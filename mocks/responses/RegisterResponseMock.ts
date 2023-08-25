import { RegisterResponseBodyMock } from '@/mocks/responseBodies';
import { type RegisterResponseBody } from '@/api/models/responseBodies';

const RegisterResponseMock: {
  statusCode: number;
  data: RegisterResponseBody;
} = {
  statusCode: 200,
  data: RegisterResponseBodyMock,
};
export default RegisterResponseMock;
