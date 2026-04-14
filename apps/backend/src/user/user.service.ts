import { db } from "../db/db.js";
import { usersTable } from "../db/users.schema.js";
import { eq, asc, or, ilike } from "drizzle-orm";
import { getOffset, paginatedData } from "../utils/pagination/index.js";
import type { DataResponse } from "../utils/dto/index.js";
import type { UserDto, CreateUserDto, UpdateUserDto, UserResponse } from "./user.dto.js";
import { hashPassword, verifyPassword } from "../auth/auth.utils.js";

export const UserService = {
  count: async (): Promise<DataResponse> => {
    const result = await db.$count(usersTable);
    return { success: true, result };
  },

  findOne: async (id: number): Promise<UserResponse> => {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id))
      .limit(1);
    if (!user) return { success: false, message: "User not found" };
    return { success: true, result: user as UserDto };
  },

  findAll: async (
    page: number = 1,
    size: number = 10,
    search: string = "",
  ): Promise<UserResponse> => {
    const offset = getOffset(page, size);
    const total = ((await UserService.count()).result as number) ?? 0;

    const whereCondition = search
      ? or(
          ilike(usersTable.username, `%${search}%`),
          ilike(usersTable.phone, `%${search}%`),
          ilike(usersTable.email, `%${search}%`),
          ilike(usersTable.full_name, `%${search}%`),
        )
      : undefined;

    const results = await db
      .select()
      .from(usersTable)
      .where(whereCondition)
      .limit(size)
      .offset(offset)
      .orderBy(asc(usersTable.id));

    return {
      success: true,
      result: results as UserDto[],
      pagination: paginatedData({ page, size, count: search ? results.length : total }),
    };
  },

  create: async (data: CreateUserDto): Promise<UserResponse> => {
    const hashed = await hashPassword(data.password);
    const [user] = await db
      .insert(usersTable)
      .values({ ...data, password: hashed })
      .returning();
    return { success: true, result: user as UserDto };
  },

  update: async (id: number, data: UpdateUserDto): Promise<UserResponse> => {
    const [existing] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id))
      .limit(1);
    if (!existing) return { success: false, message: "User not found" };

    const updateData = {
      username: data.username ?? existing.username,
      password: data.password ? await hashPassword(data.password) : existing.password,
      phone: data.phone ?? existing.phone,
      email: data.email ?? existing.email,
      full_name: data.full_name ?? existing.full_name,
      avatar: data.avatar ?? existing.avatar,
      is_active: data.is_active ?? existing.is_active,
      is_blocked: data.is_blocked ?? existing.is_blocked,
      is_suspended: data.is_suspended ?? existing.is_suspended,
      is_deleted: data.is_deleted ?? existing.is_deleted,
    };

    const [user] = await db
      .update(usersTable)
      .set(updateData)
      .where(eq(usersTable.id, id))
      .returning();
    return { success: true, result: user as UserDto };
  },

  delete: async (id: number): Promise<UserResponse> => {
    const [user] = await db
      .delete(usersTable)
      .where(eq(usersTable.id, id))
      .returning();
    if (!user) return { success: false, message: "User not found" };
    return { success: true, message: "User deleted successfully" };
  },

  findByUsername: async (username: string): Promise<UserResponse> => {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username, username))
      .limit(1);
    if (!user) return { success: false, message: "User not found" };
    return { success: true, result: user as UserDto };
  },

  verifyPassword: async (username: string, password: string): Promise<DataResponse> => {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username, username))
      .limit(1);
    if (!user) return { success: false, message: "User not found" };
    const valid = await verifyPassword(password, user.password);
    return {
      success: true,
      result: valid,
      message: valid ? "Password is valid" : "Password is invalid",
    };
  },
};

export default UserService;
