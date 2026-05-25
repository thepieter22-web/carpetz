import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { ok: false, message: "Mollie is tijdelijk uitgeschakeld" },
    { status: 503 }
  );
}
