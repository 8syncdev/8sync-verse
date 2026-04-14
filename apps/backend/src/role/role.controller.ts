import { api } from "encore.dev/api";
import type { DataResponse } from "../utils";

export const health = api(
  { expose: true, method: "GET", path: "/role/health" },
  async (): Promise<DataResponse> => {
    return { success: true, result: { service: "role", timestamp: new Date().toISOString() } };
  },
);
