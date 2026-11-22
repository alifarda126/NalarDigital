import type { Metadata } from "next";
import { AdminPortalClient } from "@/components/admin/AdminPortalClient";

export const metadata: Metadata = {
  title: "Superadmin CMS — Nalar Digital",
  description:
    "Panel manajemen portofolio dan pustaka asset internal Superadmin Nalar Digital.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminPortalClient />;
}
