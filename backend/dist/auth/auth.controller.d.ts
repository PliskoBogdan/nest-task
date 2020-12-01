import { UserService } from 'src/shared/user.service';
import { AuthService } from './auth.service';
export declare class AuthController {
    private userService;
    private authService;
    constructor(userService: UserService, authService: AuthService);
    login(userDTO: any): Promise<{
        userInfo: {
            username: string;
            first_name: string;
            last_name: string;
            userId: any;
        };
        token: string;
    }>;
    register(userDTO: any): Promise<{
        user: import("../types/user").User;
    }>;
}
