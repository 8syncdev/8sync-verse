import { api } from "encore.dev/api";
import type { DataResponse } from "../utils";

// GET /user/health
export const health = api(
  { expose: true, method: "GET", path: "/user/health" },
  async (): Promise<DataResponse> => {
    return { success: true, result: { service: "user", timestamp: new Date().toISOString() } };
  },
);
