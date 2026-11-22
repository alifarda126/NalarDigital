import { NextResponse } from "next/server";
import { getAdminConfig, getAuthenticatedAdmin } from "@/lib/server/admin-auth";

export async function GET() {
  const config = getAdminConfig();
  if (!config) {
    return NextResponse.json({
      authenticated: false,
      configured: false,
    });
  }

  const session = await getAuthenticatedAdmin();
  if (!session) {
    return NextResponse.json({
      authenticated: false,
      configured: true,
    });
  }

  return NextResponse.json({
    authenticated: true,
    configured: true,
    username: session.u,
    role: session.role,
  });
}
