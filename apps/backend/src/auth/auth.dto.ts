import type { DataResponse } from "../utils";

export interface LoginDto {
  username: string;
  password: string;
}

export interface RegisterDto {
  username: string;
  password: string;
  email: string;
  fullName: string;
}

export interface AuthData {
  userId: string;
  username: string;
  fullName?: string;
  email?: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export type TokenResponse = DataResponse<TokenPair>;
export type AuthResponse = DataResponse<AuthData>;
