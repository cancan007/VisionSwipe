import { AuthService } from './auth.service';
import { User } from '../../entities/user.entity';
export declare type PasswordOmitUser = Omit<User, 'password'>;
declare const LocalStrategy_base: new (...args: any[]) => any;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(username: User['username'], password: User['password']): Promise<PasswordOmitUser>;
}
export {};
