import { AuthService } from './auth.service';
import { PasswordOmitUser } from './local.strategy';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: {
        user: PasswordOmitUser;
    }): Promise<{
        access_token: string;
        id: string;
        firstName: any;
        lastName: any;
        username: any;
        email: any;
        fullName: string;
    }>;
}
