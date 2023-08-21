import { AuthResponseBodyMock } from "@/mocks/responseBodies";
import { AuthResponseBody } from "@/api/models/responseBodies";

const AuthResponseMock: {
    statusCode: number;
    data: AuthResponseBody
} = {
    statusCode: 200,
    data: AuthResponseBodyMock
}
export default AuthResponseMock;