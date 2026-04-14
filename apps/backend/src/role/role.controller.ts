import { api } from "encore.dev/api";
import { RoleService, UserRoleService } from "./role.service.js";
import type {
  CreateRoleDto,
  RoleResponse,
  CreateUserRoleDto,
  UserRoleResponse,
  RoleName,
} from "./role.dto.js";
import type { DataResponse } from "../utils/index.js";

// GET /role/health
export const health = api(
  { expose: true, method: "GET", path: "/role/health" },
  async (): Promise<DataResponse> => {
    return { success: true, result: { service: "role", timestamp: new Date().toISOString() } };
  },
);

// GET /roles/count
export const countRoles = api(
  { expose: true, method: "GET", path: "/roles/count" },
  async (): Promise<DataResponse> => {
    return RoleService.count();
  },
);

// GET /roles
export const getRoles = api(
  { expose: true, method: "GET", path: "/roles" },
  async ({
    page = 1,
    size = 10,
    search = "",
  }: {
    page?: number;
    size?: number;
    search?: string;
  }): Promise<RoleResponse> => {
    return RoleService.findAll(page > 0 ? page : 1, size > 0 ? size : 10, search);
  },
);

// GET /roles/:id
export const getRole = api(
  { expose: true, method: "GET", path: "/roles/:id" },
  async ({ id }: { id: string }): Promise<RoleResponse> => {
    return RoleService.findOne(Number(id));
  },
);

// POST /roles
export const createRole = api(
  { expose: true, method: "POST", path: "/roles" },
  async (body: CreateRoleDto): Promise<RoleResponse> => {
    return RoleService.create(body);
  },
);

// PUT /roles/:id
export const updateRole = api(
  { expose: true, method: "PUT", path: "/roles/:id" },
  async (params: { id: string; name?: string; description?: string }): Promise<RoleResponse> => {
    if (!params.id) return { success: false, message: "Id is required" };
    return RoleService.update(Number(params.id), { name: params.name, description: params.description });
  },
);

// DELETE /roles/:id
export const deleteRole = api(
  { expose: true, method: "DELETE", path: "/roles/:id" },
  async ({ id }: { id: string }): Promise<RoleResponse> => {
    return RoleService.delete(Number(id));
  },
);

// --- User-Role ---

// GET /user-roles
export const getUserRoles = api(
  { expose: true, method: "GET", path: "/user-roles" },
  async ({
    page = 1,
    size = 10,
    search = "",
  }: {
    page?: number;
    size?: number;
    search?: string;
  }): Promise<UserRoleResponse> => {
    return UserRoleService.findAll(page > 0 ? page : 1, size > 0 ? size : 10, search);
  },
);

// POST /user-roles
export const createUserRole = api(
  { expose: true, method: "POST", path: "/user-roles" },
  async (body: CreateUserRoleDto): Promise<UserRoleResponse> => {
    return UserRoleService.create(body);
  },
);

// PUT /user-roles/:userId/:roleId
export const updateUserRole = api(
  { expose: true, method: "PUT", path: "/user-roles/:userId/:roleId" },
  async (params: { userId: string; roleId: string }): Promise<UserRoleResponse> => {
    return UserRoleService.update(Number(params.userId), Number(params.roleId), {});
  },
);

// DELETE /user-roles/:userId/:roleId
export const deleteUserRole = api(
  { expose: true, method: "DELETE", path: "/user-roles/:userId/:roleId" },
  async ({ userId, roleId }: { userId: string; roleId: string }): Promise<UserRoleResponse> => {
    return UserRoleService.delete(Number(userId), Number(roleId));
  },
);

// GET /user-roles/check/:userId/:roleId
export const checkUserRole = api(
  { expose: true, method: "GET", path: "/user-roles/check/:userId/:roleId" },
  async ({ userId, roleId }: { userId: string; roleId: string }): Promise<UserRoleResponse> => {
    return UserRoleService.checkUserRole(Number(userId), Number(roleId));
  },
);

// GET /user-roles/all/:userId
export const getAllRolesByUserId = api(
  { expose: true, method: "GET", path: "/user-roles/all/:userId" },
  async ({ userId }: { userId: string }): Promise<RoleResponse> => {
    return UserRoleService.getAllRolesByUserId(Number(userId));
  },
);

// POST /user-roles/create/:userId
export const createRolesForUser = api(
  { expose: true, method: "POST", path: "/user-roles/create/:userId" },
  async ({
    userId,
    roleNames,
  }: {
    userId: string;
    roleNames: RoleName[];
  }): Promise<UserRoleResponse> => {
    return UserRoleService.createRolesForUser(Number(userId), roleNames);
  },
);

// POST /user-roles/delete/:userId
export const deleteRolesForUser = api(
  { expose: true, method: "POST", path: "/user-roles/delete/:userId" },
  async ({
    userId,
    roleNames,
  }: {
    userId: string;
    roleNames: RoleName[];
  }): Promise<UserRoleResponse> => {
    return UserRoleService.deleteRolesForUser(Number(userId), roleNames);
  },
);
