import { SQLDatabase } from "encore.dev/storage/sqldb";
import { drizzle } from "drizzle-orm/node-postgres";
import * as usersSchema from "./users.schema.js";
import * as rolesSchema from "./roles.schema.js";

const DB = new SQLDatabase("users_db", {
    migrations: "./migrations",
});

export const db = drizzle(DB.connectionString, {
    schema: { ...usersSchema, ...rolesSchema },
});
