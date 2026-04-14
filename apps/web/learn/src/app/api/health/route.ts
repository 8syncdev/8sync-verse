import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "8sync-learn",
    timestamp: new Date().toISOString(),
  });
}
