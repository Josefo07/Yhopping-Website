import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ error: "This chat service is not available. Use the self-assessment or contact Yhopping." }, { status: 410 });
}
