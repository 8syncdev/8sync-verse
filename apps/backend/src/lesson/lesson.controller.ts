import { api } from "encore.dev/api";
import type { DataResponse } from "../utils";

export const health = api(
  { expose: true, method: "GET", path: "/lesson/health" },
  async (): Promise<DataResponse> => {
    return { success: true, result: { service: "lesson", timestamp: new Date().toISOString() } };
  },
);
