import { type AuthResponseBody } from "@/api/models/responseBodies"
import { UserMock } from "@/mocks";

const AuthResponseBodyMock: AuthResponseBody = {
    data: {
        accessToken: 'access-token',
        user: UserMock,
    }
}
export default AuthResponseBodyMock;