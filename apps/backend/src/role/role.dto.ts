import type { DataResponse, Paginated } from "../utils/index.js";
import type { Min, MinLen, MaxLen } from "encore.dev/validate";

export interface RoleDto {
  id: number & Min<1>;
  name: string & MinLen<1> & MaxLen<255>;
  description: string & MaxLen<500>;
}

export interface CreateRoleDto extends Omit<RoleDto, "id"> {}
export interface UpdateRoleDto extends Partial<RoleDto> {}

export interface RoleResponse extends Omit<DataResponse, "result"> {
  result?: RoleDto | RoleDto[];
  pagination?: Paginated;
}

export interface UserRoleDto {
  userId: number & Min<1>;
  roleId: number & Min<1>;
}

export interface CreateUserRoleDto extends UserRoleDto {}
export interface UpdateUserRoleDto extends Partial<UserRoleDto> {}

export interface UserRoleResponse extends Omit<DataResponse, "result"> {
  result?: UserRoleDto | UserRoleDto[];
  pagination?: Paginated;
}

export type RoleName = "admin" | "user" | string;
