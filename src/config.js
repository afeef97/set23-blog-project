import dotenv from "dotenv";
dotenv.config();
import packageJson from "../package.json";

/**
 * Pattern for config is:
 * key: process.env['KEY'] ?? default
 */
const config = {
    version: packageJson.version,
    name: packageJson.name,
    description: packageJson.description,

    nodeEnv: process.env["NODE_ENV"] ?? "development",
    port: process.env["PORT"] ?? 3000,

    jwtSecretToken: process.env["JWT_SECRET_TOKEN"],

    postgres: {
        host: config.process.env["POSTGRES_HOST"],
        port: config.process.env["POSTGRES_PORT"],
        database: config.process.env["POSTGRES_DATABASE"],
        user: config.process.env["POSTGRES_USER"],
        password: config.process.env["POSTGRES_PASSWORD"],
    },

    clientOrigins: {
        development: process.env["DEV_ORIGIN"] ?? "*",
        production: process.env["PROD_ORIGIN"] ?? "none",
    },
};

export default config;
