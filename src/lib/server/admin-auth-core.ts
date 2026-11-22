import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_SESSION_COOKIE = "nalar_admin_session";
export const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 hours
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const RATE_LIMIT_MAX_ATTEMPTS = 8;

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const loginAttempts = new Map<string, RateLimitEntry>();

export interface AdminAuthConfig {
  username: string;
  password: string;
  sessionSecret: string;
}

export interface AdminSessionPayload {
  u: string;
  role: "superadmin";
  exp: number;
}

/**
 * Reads superadmin credentials strictly from environment variables.
 * Returns null if not configured so no hardcoded secrets exist in source code.
 */
export function getAdminConfig(
  env: Record<string, string | undefined> = process.env
): AdminAuthConfig | null {
  const username = env.ADMIN_USERNAME?.trim() ?? "";
  const password = env.ADMIN_PASSWORD ?? "";
  const sessionSecret = env.ADMIN_SESSION_SECRET?.trim() ?? "";

  if (!username || !password || sessionSecret.length < 16) {
    return null;
  }

  return { username, password, sessionSecret };
}

function constantTimeEquals(a: string, b: string): boolean {
  const hashA = createHash("sha256").update(a, "utf8").digest();
  const hashB = createHash("sha256").update(b, "utf8").digest();
  return timingSafeEqual(hashA, hashB);
}

export function verifyAdminCredentials(
  username: string,
  password: string,
  config: AdminAuthConfig
): boolean {
  const userMatch = constantTimeEquals(username.trim(), config.username);
  const passMatch = constantTimeEquals(password, config.password);
  return userMatch && passMatch;
}

function signPayload(encodedPayload: string, secret: string): string {
  return createHmac("sha256", secret)
    .update(encodedPayload)
    .digest("base64url");
}

export function createSessionToken(
  username: string,
  secret: string,
  nowMs: number = Date.now()
): string {
  const payload: AdminSessionPayload = {
    u: username,
    role: "superadmin",
    exp: Math.floor(nowMs / 1000) + SESSION_TTL_SECONDS,
  };
  const encoded = Buffer.from(JSON.stringify(payload), "utf8").toString(
    "base64url"
  );
  const signature = signPayload(encoded, secret);
  return `${encoded}.${signature}`;
}

export function verifySessionToken(
  token: string | undefined,
  secret: string,
  nowMs: number = Date.now()
): AdminSessionPayload | null {
  if (!token || !secret) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [encoded, providedSig] = parts;
  if (!encoded || !providedSig) return null;

  const expectedSig = signPayload(encoded, secret);
  if (!constantTimeEquals(providedSig, expectedSig)) {
    return null;
  }

  try {
    const raw = Buffer.from(encoded, "base64url").toString("utf8");
    const parsed = JSON.parse(raw) as Partial<AdminSessionPayload>;
    if (
      typeof parsed.u !== "string" ||
      parsed.role !== "superadmin" ||
      typeof parsed.exp !== "number"
    ) {
      return null;
    }

    const nowSec = Math.floor(nowMs / 1000);
    if (parsed.exp <= nowSec) {
      return null;
    }

    return {
      u: parsed.u,
      role: "superadmin",
      exp: parsed.exp,
    };
  } catch {
    return null;
  }
}

export function checkLoginRateLimit(
  clientKey: string,
  nowMs: number = Date.now()
): { allowed: boolean; retryAfterSeconds: number } {
  const entry = loginAttempts.get(clientKey);
  if (!entry || nowMs >= entry.resetAt) {
    return { allowed: true, retryAfterSeconds: 0 };
  }
  if (entry.count >= RATE_LIMIT_MAX_ATTEMPTS) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((entry.resetAt - nowMs) / 1000)),
    };
  }
  return { allowed: true, retryAfterSeconds: 0 };
}

export function recordFailedLogin(
  clientKey: string,
  nowMs: number = Date.now()
): void {
  const entry = loginAttempts.get(clientKey);
  if (!entry || nowMs >= entry.resetAt) {
    loginAttempts.set(clientKey, {
      count: 1,
      resetAt: nowMs + RATE_LIMIT_WINDOW_MS,
    });
    return;
  }
  entry.count += 1;
}

export function clearLoginAttempts(clientKey: string): void {
  loginAttempts.delete(clientKey);
}
