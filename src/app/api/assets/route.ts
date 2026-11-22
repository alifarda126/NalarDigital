import { NextResponse } from "next/server";
import { validateImageUpload } from "@/lib/portfolio-validation";
import { getAuthenticatedAdmin } from "@/lib/server/admin-auth";
import {
  deletePortfolioAssetFromDisk,
  isLocalWriteEnabled,
  listDiskAssets,
  savePortfolioAssetToDisk,
} from "@/lib/server/local-cms";

function unauthorizedResponse() {
  return NextResponse.json(
    { error: "Akses ditolak. Login Superadmin diperlukan." },
    { status: 401 }
  );
}

function readOnlyResponse() {
  return NextResponse.json(
    {
      readOnly: true,
      error:
        "Upload asset ke disk tidak aktif di lingkungan produksi. Asset akan disimpan secara lokal di browser.",
    },
    { status: 501 }
  );
}

export async function GET() {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return unauthorizedResponse();
  }

  const assets = await listDiskAssets();
  return NextResponse.json({
    assets,
    writable: isLocalWriteEnabled(),
  });
}

export async function POST(request: Request) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return unauthorizedResponse();
  }

  if (!isLocalWriteEnabled()) {
    return readOnlyResponse();
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { error: "Request harus menggunakan multipart/form-data." },
      { status: 400 }
    );
  }

  const fileEntry = formData.get("file");
  if (!(fileEntry instanceof File)) {
    return NextResponse.json(
      { error: "Field 'file' wajib berisi gambar yang diunggah." },
      { status: 400 }
    );
  }

  const arrayBuffer = await fileEntry.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);

  const validation = validateImageUpload(
    {
      name: fileEntry.name,
      type: fileEntry.type,
      size: fileEntry.size,
    },
    bytes
  );

  if (!validation.ok) {
    return NextResponse.json(
      {
        error: validation.errors.file ?? "File gambar tidak valid.",
        errors: validation.errors,
      },
      { status: 400 }
    );
  }

  try {
    const asset = await savePortfolioAssetToDisk(
      fileEntry.name,
      validation.data.ext,
      bytes
    );
    const assets = await listDiskAssets();
    return NextResponse.json({ asset, assets, writable: true }, { status: 201 });
  } catch (error) {
    console.error("[api/assets POST] Failed to store asset:", error);
    return NextResponse.json(
      { error: "Gagal menyimpan file asset ke folder public/assets/portfolio." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return unauthorizedResponse();
  }

  if (!isLocalWriteEnabled()) {
    return readOnlyResponse();
  }

  const url = new URL(request.url);
  const fileName = url.searchParams.get("name")?.trim() ?? "";

  if (!fileName) {
    return NextResponse.json(
      { error: "Parameter 'name' wajib diisi." },
      { status: 400 }
    );
  }

  try {
    const deleted = await deletePortfolioAssetFromDisk(fileName);
    if (!deleted) {
      return NextResponse.json(
        { error: "File asset tidak ditemukan di public/assets/portfolio." },
        { status: 404 }
      );
    }

    const assets = await listDiskAssets();
    return NextResponse.json({ deletedName: fileName, assets, writable: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Gagal menghapus file asset.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
