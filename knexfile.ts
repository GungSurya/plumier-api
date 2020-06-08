import { Config } from "knex";
import dotenv from "dotenv";

dotenv.config();
console.log(process.env.DB_URI);
export const configuration: Config = {
    client: "mysql2",
    connection: process.env.DB_URI,
    migrations: {
        tableName: "_knex_migrations",
        directory: "./db/migrations"
    },
    seeds: {
        directory: "./db/seeds"
    }
};
export const development: Config = { ...configuration };
export const production: Config = { ...configuration };