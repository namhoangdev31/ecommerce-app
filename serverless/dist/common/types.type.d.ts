import { UserSerializer } from "src/auth/serializer/user.serializer";
export interface AuthResponse {
    access_token?: string;
    refresh_token?: string;
    error?: string;
    statusCode?: number;
    code?: string;
    user?: UserSerializer;
}
