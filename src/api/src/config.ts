import dotenv from 'dotenv';

export interface Config {
    app: AppConfig;
    db: DatabaseConfig;
}

export interface AppConfig {
    port: string;
}

export interface DatabaseConfig {
    connectionUrl: string;
}

dotenv.config();

export const config : Config = (() => ({
    app: {
        port: process.env.PORT!,
    },
    db: {
        connectionUrl: process.env.DB_CONNECTION!
    }
}))();