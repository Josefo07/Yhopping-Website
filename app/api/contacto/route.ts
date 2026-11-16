import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (origin && origin !== req.nextUrl.origin) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }
  try {
    const raw = await req.text();
    if (raw.length > 12000) return NextResponse.json({ error: "Too large" }, { status: 413 });
    const data = JSON.parse(raw);
    if (!data || typeof data !== "object") throw new Error("Invalid body");
    const fields = ["nombre", "email", "telefono", "mensaje"] as const;
    if (fields.some((key) => typeof data[key] !== "string" || !data[key].trim())) {
      return NextResponse.json({ error: "Invalid fields" }, { status: 400 });
    }
    if (data.website) return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
    if (data.nombre.length > 160 || data.email.length > 254 || data.telefono.length > 30 || data.mensaje.length < 20 || data.mensaje.length > 5000 || (data.empresa !== undefined && (typeof data.empresa !== "string" || data.empresa.length > 200)) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return NextResponse.json({ error: "Invalid fields" }, { status: 400 });
    }
    const key = process.env.RESEND_API_KEY;
    const from = process.env.CONTACT_FROM_EMAIL;
    if (!key || !from) return NextResponse.json({ error: "Email unavailable" }, { status: 503 });
    const text = `Nombre: ${data.nombre}\nEmail: ${data.email}\nTeléfono: ${data.telefono}\nEmpresa: ${data.empresa || "—"}\n\n${data.mensaje}`;
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json", "Idempotency-Key": `contact-${createHash("sha256").update(text).digest("hex")}` },
      body: JSON.stringify({ from, to: ["atencionaclientes@yhopping.com"], reply_to: data.email, subject: "Nueva consulta desde Yhopping", text }),
      signal: AbortSignal.timeout(12000),
    });
    if (!response.ok) return NextResponse.json({ error: "Email unavailable" }, { status: 502 });
    const result = await response.json();
    if (!result.id) return NextResponse.json({ error: "Email unavailable" }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unable to process request" }, { status: 400 });
  }
}
