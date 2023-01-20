/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose" />
export declare type UserDocument = User & Document;
export declare class User {
    id: string;
    firstName: any;
    lastName: any;
    fullName: string;
    username: any;
    email: any;
    password: any;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any>, any, any>;
