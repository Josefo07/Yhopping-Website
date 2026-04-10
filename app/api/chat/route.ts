import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Use server-side env var first, fall back to client-provided key
    const apiKey =
      process.env.ANTHROPIC_API_KEY ||
      (body._apiKey as string | undefined);

    delete body._apiKey;

    if (!apiKey) {
      console.error("[chat/route] No API key found");
      return NextResponse.json({ error: "Missing API key" }, { status: 400 });
    }

    console.log("[chat/route] Calling Anthropic, model:", body.model, "key prefix:", apiKey.slice(0, 12));

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("[chat/route] Anthropic error:", res.status, JSON.stringify(data));
    }

    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("[chat/route] Proxy error:", err);
    return NextResponse.json({ error: "Proxy error" }, { status: 502 });
  }
}
