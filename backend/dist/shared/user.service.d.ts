import { User } from 'src/types/user';
import { Model } from 'mongoose';
import { LoginDTO, RegisterDTO } from '../auth/auth.dto';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    private sanitizeUser;
    create(userDTO: RegisterDTO): Promise<User>;
    findByLogin(userDTO: LoginDTO): Promise<User>;
    findByPayload(payload: any): Promise<User>;
}
