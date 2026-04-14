CREATE TABLE IF NOT EXISTS "users" (
  "id" serial PRIMARY KEY,
  "username" text UNIQUE NOT NULL,
  "password" text NOT NULL,
  "phone" text UNIQUE NOT NULL DEFAULT '',
  "email" text UNIQUE NOT NULL DEFAULT '',
  "full_name" text NOT NULL DEFAULT '',
  "avatar" text NOT NULL DEFAULT '',
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT now(),
  "is_active" boolean NOT NULL DEFAULT false,
  "is_deleted" boolean NOT NULL DEFAULT false,
  "is_blocked" boolean NOT NULL DEFAULT false,
  "is_suspended" boolean NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS "roles" (
  "id" serial PRIMARY KEY,
  "name" text UNIQUE NOT NULL,
  "description" text NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS "user_roles" (
  "user_id" integer NOT NULL,
  "role_id" integer NOT NULL
);

INSERT INTO "roles" ("name", "description") VALUES
  ('admin', 'Administrator role'),
  ('user', 'Regular user role')
ON CONFLICT DO NOTHING;
