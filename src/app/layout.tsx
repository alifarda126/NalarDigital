import type { Metadata } from "next";
import { Open_Sans, Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nalar Digital — Insight-Driven Growth. Decisions That Matter.",
  description:
    "Full-service digital agency berkonsep Build & Grow dengan pendekatan Insight-Driven Decision Making untuk UMKM dan perusahaan B2B.",
  icons: {
    icon: "/images/brand/logo-nd-transparent.png",
    apple: "/images/brand/logo-nd-transparent.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${rubik.variable} ${openSans.variable} scroll-smooth`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-brand-canvas font-sans text-brand-navy antialiased overflow-x-hidden"
      >
        {children}
      </body>
    </html>
  );
}
