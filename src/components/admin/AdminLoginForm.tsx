"use client";

import Link from "next/link";
import { useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  Eye,
  EyeOff,
  Lock,
  ShieldCheck,
  User,
} from "lucide-react";
import { BrandLogo } from "../BrandLogo";

interface AdminLoginFormProps {
  configured: boolean;
  initialError?: string | null;
  onSuccess: (username: string) => void;
}

export function AdminLoginForm({
  configured,
  initialError,
  onSuccess,
}: AdminLoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(initialError ?? null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!username.trim() || !password) {
      setError("Masukkan username dan password Superadmin.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password }),
      });

      const payload = (await res.json()) as {
        authenticated?: boolean;
        username?: string;
        error?: string;
      };

      if (!res.ok || !payload.authenticated) {
        setError(payload.error ?? "Login gagal. Periksa kredensial Anda.");
        return;
      }

      onSuccess(payload.username ?? username.trim());
    } catch {
      setError("Tidak dapat menghubungi server autentikasi.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-brand-navy px-4 py-12 text-white">
      {/* Ambient palette glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 -left-24 h-80 w-80 rounded-full bg-brand-primary/35 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -right-24 h-80 w-80 rounded-full bg-brand-sky/25 blur-3xl"
      />

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-6 flex flex-col items-center text-center">
          <BrandLogo variant="dark" size="lg" />
          <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-brand-lime px-3 py-1 font-heading text-[11px] font-extrabold uppercase tracking-wider text-brand-navy">
            <ShieldCheck className="h-3.5 w-3.5" />
            Superadmin CMS Portal
          </span>
        </div>

        <div className="rounded-3xl border border-white/12 bg-white p-6 text-brand-navy shadow-[0_32px_80px_rgba(10,12,26,0.45)] min-[480px]:p-8">
          <h1 className="font-heading text-xl font-bold text-brand-navy">
            Masuk ke Panel Superadmin
          </h1>
          <p className="mt-1 text-xs leading-relaxed text-[#525775]">
            Akses terpisah untuk mengelola portofolio proyek, bidang aplikasi, platform, bahasa pemrograman, dan pustaka asset visual Nalar Digital.
          </p>

          {!configured && (
            <div
              role="alert"
              className="mt-4 flex items-start gap-2.5 rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-3.5 text-xs text-[#92400E]"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <div>
                <p className="font-bold">Konfigurasi environment belum lengkap</p>
                <p className="mt-0.5 leading-relaxed">
                  Salin <code>.env.example</code> menjadi <code>.env.local</code> dan atur <code>ADMIN_USERNAME</code>, <code>ADMIN_PASSWORD</code>, serta <code>ADMIN_SESSION_SECRET</code>.
                </p>
              </div>
            </div>
          )}

          {error && (
            <div
              role="alert"
              className="mt-4 flex items-start gap-2.5 rounded-2xl border border-[#FECACA] bg-[#FEF2F2] p-3.5 text-xs font-medium text-[#991B1B]"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div>
              <label
                htmlFor="admin-username"
                className="block font-heading text-xs font-bold uppercase tracking-wide text-brand-navy"
              >
                Username Superadmin
              </label>
              <div className="relative mt-1.5">
                <User className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#6B7194]" />
                <input
                  id="admin-username"
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="superadmin"
                  className="w-full rounded-xl border border-brand-muted bg-brand-canvas/60 py-2.5 pr-3.5 pl-10 text-sm text-brand-navy focus:border-brand-primary focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block font-heading text-xs font-bold uppercase tracking-wide text-brand-navy"
              >
                Password
              </label>
              <div className="relative mt-1.5">
                <Lock className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#6B7194]" />
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl border border-brand-muted bg-brand-canvas/60 py-2.5 pr-11 pl-10 text-sm text-brand-navy focus:border-brand-primary focus:bg-white focus:outline-none"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute top-1/2 right-2.5 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-[#525775] hover:bg-brand-soft hover:text-brand-navy cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting || !configured}
              className="mt-2 inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl bg-brand-gradient px-5 py-3 font-heading text-sm font-bold text-white shadow-[0_12px_28px_rgba(58,78,251,0.3)] transition-all hover:-translate-y-0.5 disabled:opacity-55 cursor-pointer"
            >
              {submitting ? "Memverifikasi..." : "Masuk ke Superadmin CMS"}
            </button>
          </form>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-heading text-xs font-semibold text-brand-muted transition-colors hover:text-brand-lime"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Kembali ke Website Utama
          </Link>
        </div>
      </div>
    </div>
  );
}
