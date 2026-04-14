import crypto from "node:crypto";

const ITERATIONS = 310000;
const KEYLEN = 64;
const DIGEST = "sha512";

const TOKEN_EXPIRATION = {
  ACCESS: 24 * 60 * 60 * 30, // 30 days
  REFRESH: 24 * 60 * 60 * 90, // 90 days
};

type TokenType = "ACCESS" | "REFRESH";

const APP_SLUG = "8syncverse";

export async function hashPassword(password?: string): Promise<string> {
  if (!password) throw new Error("Password is required");
  const salt = crypto.randomBytes(32).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, ITERATIONS, KEYLEN, DIGEST)
    .toString("hex");
  return `${salt}:${hash}`;
}

export async function verifyPassword(
  password: string,
  storedHash: string,
): Promise<boolean> {
  const [salt, hash] = storedHash.split(":");
  const verifyHash = crypto
    .pbkdf2Sync(password, salt, ITERATIONS, KEYLEN, DIGEST)
    .toString("hex");
  return hash === verifyHash;
}

interface UserData {
  userId: string;
  username: string;
  full_name?: string;
}

interface JWTPayload extends UserData {
  iat: number;
  exp: number;
  jti: string;
  iss: string;
  aud: string;
  type: TokenType;
}

interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

const secret = process.env.JWT_SECRET ?? "8syncdev1910200427122003";

function createToken(userData: UserData, type: TokenType): string {
  const header = { alg: "HS512", typ: "JWT" };
  const payload: JWTPayload = {
    ...userData,
    type,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + TOKEN_EXPIRATION[type],
    jti: crypto.randomBytes(16).toString("hex"),
    iss: APP_SLUG,
    aud: APP_SLUG,
  };

  const h = Buffer.from(JSON.stringify(header)).toString("base64url");
  const p = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = crypto
    .createHmac("sha512", secret)
    .update(`${h}.${p}`)
    .digest("base64url");

  return `${h}.${p}.${sig}`;
}

export function generateTokenPair(userData: UserData): TokenPair {
  return {
    accessToken: createToken(userData, "ACCESS"),
    refreshToken: createToken(userData, "REFRESH"),
    expiresIn: TOKEN_EXPIRATION.ACCESS,
  };
}

export function verifyToken(
  token: string,
): JWTPayload {
  const [h, p, sig] = token.split(".");
  const expected = crypto
    .createHmac("sha512", secret)
    .update(`${h}.${p}`)
    .digest("base64url");

  if (sig !== expected) throw new Error("Invalid token signature");

  const payload = JSON.parse(
    Buffer.from(p, "base64url").toString(),
  ) as JWTPayload;

  if (payload.exp < Math.floor(Date.now() / 1000)) {
    throw new Error("Token expired");
  }

  return payload;
}

export type { UserData, JWTPayload, TokenPair, TokenType };
