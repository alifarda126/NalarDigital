import type { Metadata } from "next";
import { AssetsStudioClient } from "@/components/assets/AssetsStudioClient";

export const metadata: Metadata = {
  title: "Asset & Portofolio Studio — Nalar Digital",
  description:
    "Kelola portofolio aplikasi lintas platform & bahasa pemrograman, unggah asset visual portofolio, serta akses Brand Kit resmi Nalar Digital.",
};

export default function AssetsPage() {
  return <AssetsStudioClient />;
}
