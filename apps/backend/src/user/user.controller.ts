import { api } from "encore.dev/api";
import { UserService } from "./user.service.js";
import type { CreateUserDto, UpdateUserDto, UserResponse } from "./user.dto.js";
import type { DataResponse } from "../utils/index.js";

// GET /user/health
export const health = api(
  { expose: true, method: "GET", path: "/user/health" },
  async (): Promise<DataResponse> => {
    return { success: true, result: { service: "user", timestamp: new Date().toISOString() } };
  },
);

// GET /users/count
export const countUsers = api(
  { expose: true, method: "GET", path: "/users/count" },
  async (): Promise<DataResponse> => {
    return UserService.count();
  },
);

// GET /users
export const getUsers = api(
  {
    expose: true,
    method: "GET",
    path: "/users",
  },
  async ({
    page,
    size,
    search = "",
  }: {
    page: number;
    size: number;
    search?: string;
  }): Promise<UserResponse> => {
    return UserService.findAll(page > 0 ? page : 1, size > 0 ? size : 10, search);
  },
);

// GET /users/:id
export const getUser = api(
  { expose: true, method: "GET", path: "/users/:id" },
  async ({ id }: { id: number }): Promise<UserResponse> => {
    return UserService.findOne(id);
  },
);

// POST /users
export const createUser = api(
  { expose: true, method: "POST", path: "/users" },
  async (body: CreateUserDto): Promise<UserResponse> => {
    return UserService.create(body);
  },
);

// PUT /users/:id
export const updateUser = api(
  { expose: true, method: "PUT", path: "/users/:id" },
  async (body: UpdateUserDto & { id: number }): Promise<UserResponse> => {
    if (!body.id) return { success: false, message: "User not found" };
    return UserService.update(body.id, body);
  },
);

// DELETE /users/:id
export const deleteUser = api(
  { expose: true, method: "DELETE", path: "/users/:id" },
  async ({ id }: { id: number }): Promise<UserResponse> => {
    return UserService.delete(id);
  },
);

// POST /users/verify-password
export const verifyUserPassword = api(
  { expose: true, method: "POST", path: "/users/verify-password" },
  async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<DataResponse> => {
    return UserService.verifyPassword(username, password);
  },
);
