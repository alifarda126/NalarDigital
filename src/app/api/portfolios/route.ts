import { NextResponse } from "next/server";
import { validatePortfolioInput } from "@/lib/portfolio-validation";
import { getAuthenticatedAdmin } from "@/lib/server/admin-auth";
import {
  buildPortfolioItem,
  isLocalWriteEnabled,
  readPortfoliosFromDisk,
  writePortfoliosToDisk,
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
        "Mode penyimpanan disk tidak aktif di lingkungan produksi. Perubahan akan disimpan di penyimpanan browser (localStorage).",
    },
    { status: 501 }
  );
}

export async function GET() {
  const items = await readPortfoliosFromDisk();
  return NextResponse.json({
    items,
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

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Body request harus berupa JSON yang valid." },
      { status: 400 }
    );
  }

  const validated = validatePortfolioInput(body);
  if (!validated.ok) {
    return NextResponse.json(
      { error: "Validasi data portofolio gagal.", errors: validated.errors },
      { status: 400 }
    );
  }

  try {
    const existing = await readPortfoliosFromDisk();
    const created = buildPortfolioItem(validated.data);
    const updatedList = [created, ...existing];
    await writePortfoliosToDisk(updatedList);

    return NextResponse.json(
      { item: created, items: updatedList, writable: true },
      { status: 201 }
    );
  } catch (error) {
    console.error("[api/portfolios POST] Failed to save portfolio:", error);
    return NextResponse.json(
      { error: "Gagal menyimpan portofolio ke file lokal." },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return unauthorizedResponse();
  }

  if (!isLocalWriteEnabled()) {
    return readOnlyResponse();
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Body request harus berupa JSON yang valid." },
      { status: 400 }
    );
  }

  const validated = validatePortfolioInput(body);
  if (!validated.ok) {
    return NextResponse.json(
      { error: "Validasi data portofolio gagal.", errors: validated.errors },
      { status: 400 }
    );
  }

  if (!validated.data.id) {
    return NextResponse.json(
      { error: "ID portofolio wajib disertakan untuk pembaruan." },
      { status: 400 }
    );
  }

  try {
    const existing = await readPortfoliosFromDisk();
    const targetIndex = existing.findIndex((p) => p.id === validated.data.id);
    if (targetIndex === -1) {
      return NextResponse.json(
        { error: "Portofolio yang ingin diperbarui tidak ditemukan." },
        { status: 404 }
      );
    }

    const updatedItem = buildPortfolioItem(validated.data, existing[targetIndex]);
    const updatedList = existing.map((item, idx) =>
      idx === targetIndex ? updatedItem : item
    );
    await writePortfoliosToDisk(updatedList);

    return NextResponse.json({
      item: updatedItem,
      items: updatedList,
      writable: true,
    });
  } catch (error) {
    console.error("[api/portfolios PUT] Failed to update portfolio:", error);
    return NextResponse.json(
      { error: "Gagal memperbarui portofolio di file lokal." },
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
  let targetId = url.searchParams.get("id")?.trim() ?? "";

  if (!targetId) {
    try {
      const body = (await request.json()) as { id?: unknown };
      if (typeof body.id === "string") {
        targetId = body.id.trim();
      }
    } catch {
      // Ignore missing JSON body when id wasn't provided
    }
  }

  if (!targetId) {
    return NextResponse.json(
      { error: "Parameter id portofolio wajib diisi." },
      { status: 400 }
    );
  }

  try {
    const existing = await readPortfoliosFromDisk();
    const updatedList = existing.filter((item) => item.id !== targetId);
    if (updatedList.length === existing.length) {
      return NextResponse.json(
        { error: "Portofolio tidak ditemukan." },
        { status: 404 }
      );
    }

    await writePortfoliosToDisk(updatedList);
    return NextResponse.json({
      deletedId: targetId,
      items: updatedList,
      writable: true,
    });
  } catch (error) {
    console.error("[api/portfolios DELETE] Failed to delete portfolio:", error);
    return NextResponse.json(
      { error: "Gagal menghapus portofolio dari file lokal." },
      { status: 500 }
    );
  }
}
