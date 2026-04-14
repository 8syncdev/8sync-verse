import { api } from "encore.dev/api";
import type { LoginDto, RegisterDto, TokenResponse } from "./auth.dto";
import type { DataResponse } from "../utils";

// POST /auth/login
export const login = api(
  { expose: true, method: "POST", path: "/auth/login" },
  async (_data: LoginDto): Promise<TokenResponse> => {
    // TODO: implement with AuthService
    return {
      success: true,
      result: {
        accessToken: "todo",
        refreshToken: "todo",
        expiresIn: 3600,
      },
    };
  },
);

// POST /auth/register
export const register = api(
  { expose: true, method: "POST", path: "/auth/register" },
  async (_data: RegisterDto): Promise<TokenResponse> => {
    // TODO: implement with AuthService
    return {
      success: true,
      result: {
        accessToken: "todo",
        refreshToken: "todo",
        expiresIn: 3600,
      },
    };
  },
);

// POST /auth/refresh
export const refresh = api(
  { expose: true, method: "POST", path: "/auth/refresh" },
  async ({ refreshToken: _refreshToken }: { refreshToken: string }): Promise<TokenResponse> => {
    // TODO: implement
    return { success: false, message: "Not implemented" };
  },
);

// POST /auth/verify
export const verify = api(
  { expose: true, method: "POST", path: "/auth/verify" },
  async ({ token: _token }: { token: string }): Promise<DataResponse> => {
    // TODO: implement
    return { success: false, message: "Not implemented" };
  },
);

// GET /auth/health
export const health = api(
  { expose: true, method: "GET", path: "/auth/health" },
  async (): Promise<DataResponse> => {
    return {
      success: true,
      result: {
        service: "auth",
        timestamp: new Date().toISOString(),
      },
    };
  },
);
