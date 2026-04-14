import { db } from "../db/db.js";
import { rolesTable, userRolesTable } from "../db/roles.schema.js";
import { eq, asc, and, inArray, ilike, or } from "drizzle-orm";
import { getOffset, paginatedData } from "../utils/pagination/index.js";
import type { DataResponse } from "../utils/dto/index.js";
import type {
  RoleDto,
  RoleResponse,
  CreateRoleDto,
  UpdateRoleDto,
  UserRoleDto,
  CreateUserRoleDto,
  UpdateUserRoleDto,
  UserRoleResponse,
  RoleName,
} from "./role.dto.js";

export const RoleService = {
  count: async (): Promise<DataResponse> => {
    const result = await db.$count(rolesTable);
    return { success: true, result };
  },

  findOne: async (id: number): Promise<RoleResponse> => {
    const [role] = await db
      .select()
      .from(rolesTable)
      .where(eq(rolesTable.id, id))
      .limit(1);
    if (!role) return { success: false, message: "Role not found" };
    return { success: true, result: role as RoleDto };
  },

  findAll: async (
    page: number = 1,
    size: number = 10,
    search: string = "",
  ): Promise<RoleResponse> => {
    const offset = getOffset(page, size);
    const total = ((await RoleService.count()).result as number) ?? 0;

    const whereCondition = search
      ? or(
          ilike(rolesTable.name, `%${search}%`),
          ilike(rolesTable.description, `%${search}%`),
        )
      : undefined;

    const results = await db
      .select()
      .from(rolesTable)
      .where(whereCondition)
      .limit(size)
      .offset(offset)
      .orderBy(asc(rolesTable.id));

    return {
      success: true,
      result: results as RoleDto[],
      pagination: paginatedData({ page, size, count: search ? results.length : total }),
    };
  },

  create: async (data: CreateRoleDto): Promise<RoleResponse> => {
    const [role] = await db.insert(rolesTable).values(data).returning();
    return { success: true, result: role as RoleDto };
  },

  update: async (id: number, data: UpdateRoleDto): Promise<RoleResponse> => {
    const [role] = await db
      .update(rolesTable)
      .set(data)
      .where(eq(rolesTable.id, id))
      .returning();
    if (!role) return { success: false, message: "Role not found" };
    return { success: true, result: role as RoleDto };
  },

  delete: async (id: number): Promise<RoleResponse> => {
    const [role] = await db
      .delete(rolesTable)
      .where(eq(rolesTable.id, id))
      .returning();
    if (!role) return { success: false, message: "Role not found" };
    return { success: true, message: "Role deleted successfully" };
  },
};

export const UserRoleService = {
  count: async (): Promise<DataResponse> => {
    const result = await db.$count(userRolesTable);
    return { success: true, result };
  },

  findAll: async (
    page: number = 1,
    size: number = 10,
    search: string = "",
  ): Promise<UserRoleResponse> => {
    const offset = getOffset(page, size);
    const total = ((await UserRoleService.count()).result as number) ?? 0;
    const parsedSearch = Number(search);

    const whereCondition =
      search && !Number.isNaN(parsedSearch)
        ? or(
            eq(userRolesTable.userId, parsedSearch),
            eq(userRolesTable.roleId, parsedSearch),
          )
        : undefined;

    const results = await db
      .select()
      .from(userRolesTable)
      .where(whereCondition)
      .limit(size)
      .offset(offset)
      .orderBy(asc(userRolesTable.userId));

    return {
      success: true,
      result: results as UserRoleDto[],
      pagination: paginatedData({ page, size, count: search ? results.length : total }),
    };
  },

  create: async (data: CreateUserRoleDto): Promise<UserRoleResponse> => {
    const [userRole] = await db
      .insert(userRolesTable)
      .values(data)
      .returning();
    return { success: true, result: userRole as UserRoleDto };
  },

  update: async (
    userId: number,
    roleId: number,
    data: UpdateUserRoleDto,
  ): Promise<UserRoleResponse> => {
    const [userRole] = await db
      .update(userRolesTable)
      .set(data)
      .where(
        and(eq(userRolesTable.userId, userId), eq(userRolesTable.roleId, roleId)),
      )
      .returning();
    if (!userRole) return { success: false, message: "User role not found" };
    return { success: true, result: userRole as UserRoleDto };
  },

  delete: async (userId: number, roleId: number): Promise<UserRoleResponse> => {
    await db
      .delete(userRolesTable)
      .where(
        and(eq(userRolesTable.userId, userId), eq(userRolesTable.roleId, roleId)),
      );
    return { success: true, message: "User role deleted successfully" };
  },

  checkUserRole: async (
    userId: number,
    roleId: number,
  ): Promise<UserRoleResponse> => {
    const [ur] = await db
      .select()
      .from(userRolesTable)
      .where(
        and(eq(userRolesTable.userId, userId), eq(userRolesTable.roleId, roleId)),
      )
      .limit(1);
    if (!ur) return { success: false, message: "User role not found" };
    return { success: true, result: ur as UserRoleDto };
  },

  checkRole: async (userId: number, roleName: RoleName): Promise<UserRoleResponse> => {
    const [role] = await db
      .select()
      .from(rolesTable)
      .where(eq(rolesTable.name, roleName))
      .limit(1);
    if (!role) return { success: false, message: "Role not found" };
    return UserRoleService.checkUserRole(userId, role.id);
  },

  getAllRolesByUserId: async (userId: number): Promise<RoleResponse> => {
    const userRoles = await db
      .select()
      .from(userRolesTable)
      .where(eq(userRolesTable.userId, userId));

    if (userRoles.length === 0) return { success: true, result: [] };

    const roleIds = userRoles.map((ur) => ur.roleId);
    const roles = await db
      .select()
      .from(rolesTable)
      .where(inArray(rolesTable.id, roleIds));

    return { success: true, result: roles as RoleDto[] };
  },

  createRolesForUser: async (
    userId: number,
    roleNames: RoleName[],
  ): Promise<UserRoleResponse> => {
    const roles = await db
      .select()
      .from(rolesTable)
      .where(inArray(rolesTable.name, roleNames));

    if (roles.length === 0)
      return { success: false, message: "No matching roles found" };

    await db
      .insert(userRolesTable)
      .values(roles.map((r) => ({ userId, roleId: r.id })));

    return { success: true, message: "User roles created successfully" };
  },

  deleteRolesForUser: async (
    userId: number,
    roleNames: RoleName[],
  ): Promise<UserRoleResponse> => {
    const roles = await db
      .select()
      .from(rolesTable)
      .where(inArray(rolesTable.name, roleNames));

    if (roles.length === 0)
      return { success: false, message: "No matching roles found" };

    const roleIds = roles.map((r) => r.id);
    await db
      .delete(userRolesTable)
      .where(
        and(eq(userRolesTable.userId, userId), inArray(userRolesTable.roleId, roleIds)),
      );

    return { success: true, message: "User roles deleted successfully" };
  },
};
