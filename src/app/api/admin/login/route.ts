import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  checkLoginRateLimit,
  clearLoginAttempts,
  createSessionToken,
  getAdminConfig,
  getSessionCookieOptions,
  recordFailedLogin,
  verifyAdminCredentials,
} from "@/lib/server/admin-auth";

function getClientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "local";
  }
  return request.headers.get("x-real-ip") ?? "local";
}

export async function POST(request: Request) {
  const config = getAdminConfig();
  if (!config) {
    return NextResponse.json(
      {
        error:
          "Kredensial Superadmin belum dikonfigurasi. Atur ADMIN_USERNAME, ADMIN_PASSWORD, dan ADMIN_SESSION_SECRET pada .env.local.",
      },
      { status: 503 }
    );
  }

  const clientKey = getClientKey(request);
  const rate = checkLoginRateLimit(clientKey);
  if (!rate.allowed) {
    return NextResponse.json(
      {
        error: `Terlalu banyak percobaan login gagal. Coba lagi dalam ${rate.retryAfterSeconds} detik.`,
      },
      { status: 429 }
    );
  }

  let body: { username?: unknown; password?: unknown };
  try {
    body = (await request.json()) as { username?: unknown; password?: unknown };
  } catch {
    return NextResponse.json(
      { error: "Payload login harus berupa JSON yang valid." },
      { status: 400 }
    );
  }

  const username = typeof body.username === "string" ? body.username : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!username.trim() || !password) {
    return NextResponse.json(
      { error: "Username dan password wajib diisi." },
      { status: 400 }
    );
  }

  const valid = verifyAdminCredentials(username, password, config);
  if (!valid) {
    recordFailedLogin(clientKey);
    return NextResponse.json(
      { error: "Username atau password Superadmin salah." },
      { status: 401 }
    );
  }

  clearLoginAttempts(clientKey);
  const token = createSessionToken(config.username, config.sessionSecret);
  const response = NextResponse.json({
    authenticated: true,
    username: config.username,
    role: "superadmin",
  });

  response.cookies.set(ADMIN_SESSION_COOKIE, token, getSessionCookieOptions());
  return response;
}
