import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  checkLoginRateLimit,
  clearLoginAttempts,
  createSessionToken,
  getAdminConfig,
  recordFailedLogin,
  verifyAdminCredentials,
  verifySessionToken,
} from "../src/lib/server/admin-auth-core.ts";

describe("Superadmin auth config & credential verification", () => {
  it("returns null when required environment variables are missing or secret too short", () => {
    assert.equal(getAdminConfig({}), null);
    assert.equal(
      getAdminConfig({
        ADMIN_USERNAME: "superadmin",
        ADMIN_PASSWORD: "secret",
        ADMIN_SESSION_SECRET: "too-short",
      }),
      null
    );
  });

  it("verifies exact credentials and rejects wrong username or password", () => {
    const config = getAdminConfig({
      ADMIN_USERNAME: "superadmin",
      ADMIN_PASSWORD: "StrongPassword#2026",
      ADMIN_SESSION_SECRET: "a-very-strong-session-secret-key-32chars",
    });
    assert.ok(config);

    assert.equal(
      verifyAdminCredentials("superadmin", "StrongPassword#2026", config),
      true
    );
    assert.equal(
      verifyAdminCredentials("superadmin", "WrongPassword", config),
      false
    );
    assert.equal(
      verifyAdminCredentials("admin", "StrongPassword#2026", config),
      false
    );
  });
});

describe("Signed Superadmin session token", () => {
  const secret = "unit-test-superadmin-session-secret-key-2026";

  it("creates and verifies a valid token", () => {
    const now = 1_700_000_000_000;
    const token = createSessionToken("superadmin", secret, now);
    const verified = verifySessionToken(token, secret, now + 60_000);
    assert.ok(verified);
    assert.equal(verified.u, "superadmin");
    assert.equal(verified.role, "superadmin");
  });

  it("rejects tampered tokens and wrong secrets", () => {
    const now = 1_700_000_000_000;
    const token = createSessionToken("superadmin", secret, now);
    const [payload, sig] = token.split(".");
    const tampered = `${payload}.${sig.slice(0, -2)}AA`;

    assert.equal(verifySessionToken(tampered, secret, now), null);
    assert.equal(verifySessionToken(token, "wrong-secret-key-0000", now), null);
    assert.equal(verifySessionToken("invalid.token.parts", secret, now), null);
  });

  it("rejects expired tokens", () => {
    const now = 1_700_000_000_000;
    const token = createSessionToken("superadmin", secret, now);
    const nineHoursLater = now + 9 * 60 * 60 * 1000;
    assert.equal(verifySessionToken(token, secret, nineHoursLater), null);
  });
});

describe("Login rate limiter", () => {
  it("blocks after repeated failed attempts and resets on clear", () => {
    const key = "test-ip-rate-limit";
    const now = 1_700_000_000_000;
    clearLoginAttempts(key);

    for (let i = 0; i < 8; i += 1) {
      assert.equal(checkLoginRateLimit(key, now).allowed, true);
      recordFailedLogin(key, now);
    }

    const blocked = checkLoginRateLimit(key, now + 1000);
    assert.equal(blocked.allowed, false);
    assert.ok(blocked.retryAfterSeconds > 0);

    clearLoginAttempts(key);
    assert.equal(checkLoginRateLimit(key, now + 1000).allowed, true);
  });
});
