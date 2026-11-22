import { cookies } from "next/headers";
import {
  ADMIN_SESSION_COOKIE,
  getAdminConfig,
  SESSION_TTL_SECONDS,
  verifySessionToken,
  type AdminSessionPayload,
} from "./admin-auth-core";

export {
  ADMIN_SESSION_COOKIE,
  checkLoginRateLimit,
  clearLoginAttempts,
  createSessionToken,
  getAdminConfig,
  recordFailedLogin,
  verifyAdminCredentials,
  verifySessionToken,
  type AdminAuthConfig,
  type AdminSessionPayload,
} from "./admin-auth-core";

export async function getAuthenticatedAdmin(): Promise<AdminSessionPayload | null> {
  const config = getAdminConfig();
  if (!config) return null;

  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  return verifySessionToken(token, config.sessionSecret);
}

export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  };
}
