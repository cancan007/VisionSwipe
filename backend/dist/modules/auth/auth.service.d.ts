import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
export interface JwtPAYload {
    username: User['username'];
    email: User['email'];
    id: User['id'];
}
export declare class AuthService {
    private jwtService;
    private userService;
    private readonly userRepositry;
    constructor(jwtService: JwtService, userService: UserService, userRepositry: Repository<User>);
    validateUser(username: User['username'], pass: User['password']): Promise<{
        id: string;
        firstName: any;
        lastName: any;
        fullName: string;
        username: any;
        email: any;
    }>;
    generateJwtToken(user: Omit<User, 'password'>): {
        access_token: string;
    };
}
