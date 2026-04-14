import * as p from "drizzle-orm/pg-core";

export const rolesTable = p.pgTable("roles", {
    id: p.serial().primaryKey(),
    name: p.text("name").notNull().unique(),
    description: p.text("description").notNull().default(''),
});

export const userRolesTable = p.pgTable("user_roles", {
    userId: p.integer("user_id").notNull(),
    roleId: p.integer("role_id").notNull(),
});

export type Role = typeof rolesTable.$inferSelect;
export type NewRole = typeof rolesTable.$inferInsert;
export type UserRole = typeof userRolesTable.$inferSelect;
export type NewUserRole = typeof userRolesTable.$inferInsert;
