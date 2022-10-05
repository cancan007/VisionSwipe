export declare const configuration: () => {
    NODE_ENV: string;
    MONGODB_URI: string;
    port: number;
    jwt: {
        secret: string;
        expiresIn: string;
    };
};
