import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ error: "Pilot registration is not open. No registration was created." }, { status: 503 });
}
