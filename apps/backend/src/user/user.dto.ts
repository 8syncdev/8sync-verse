import type { DataResponse, Paginated } from "../utils";
import type { MinLen, MaxLen, Min } from "encore.dev/validate";

export interface UserDto {
  id: number & Min<1>;
  username: string & MinLen<3> & MaxLen<100>;
  password: string & MinLen<8> & MaxLen<100>;
  phone: string & MaxLen<100>;
  email: string & MaxLen<100>;
  full_name: string & MaxLen<100>;
  avatar: string & MaxLen<1000>;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  is_deleted: boolean;
  is_blocked: boolean;
  is_suspended: boolean;
}

export interface CreateUserDto
  extends Omit<
    UserDto,
    | "id"
    | "created_at"
    | "updated_at"
    | "is_active"
    | "is_deleted"
    | "is_blocked"
    | "is_suspended"
    | "phone"
    | "email"
    | "full_name"
    | "avatar"
  > {}

export interface UpdateUserDto extends Partial<UserDto> {}

export interface UserResponse extends Omit<DataResponse, "result"> {
  result?: UserDto | UserDto[];
  pagination?: Paginated;
}
