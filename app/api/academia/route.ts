import { NextRequest, NextResponse } from "next/server";

interface ContactData {
  name: string;
  email: string;
  phone: string;
  company: string;
}

interface SubmissionBody {
  contact: ContactData;
  answers: Record<string, number>;
  lang: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: SubmissionBody = await req.json();
    const { contact, answers, lang } = body;

    const isEs = lang !== "en";

    // Build summary for logging / future integrations
    const summary = {
      timestamp: new Date().toISOString(),
      lang,
      contact,
      answers,
    };

    // Log server-side (visible in Vercel/Node logs)
    console.log("[academia/route] New pilot registration:", JSON.stringify(summary, null, 2));

    // ── Optional: send email via Resend, SendGrid, or Nodemailer ──
    // Uncomment and configure when you have an email provider set up:
    //
    // const emailApiKey = process.env.RESEND_API_KEY;
    // if (emailApiKey) {
    //   await fetch("https://api.resend.com/emails", {
    //     method: "POST",
    //     headers: { Authorization: `Bearer ${emailApiKey}`, "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       from: "academia@yhopping.com",
    //       to: ["academia@yhopping.com"],
    //       subject: `${isEs ? "Nuevo piloto" : "New pilot"}: ${contact.name}`,
    //       text: buildEmailText(contact, answers, lang),
    //     }),
    //   });
    // }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("[academia/route] Error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

function buildEmailText(
  contact: ContactData,
  answers: Record<string, number>,
  lang: string
): string {
  const isEs = lang !== "en";
  const lines = [
    isEs ? "Nuevo registro — Yhopping Academia Piloto" : "New registration — Yhopping Academia Pilot",
    "",
    `${isEs ? "Nombre" : "Name"}: ${contact.name}`,
    `Email: ${contact.email}`,
    `${isEs ? "Teléfono" : "Phone"}: ${contact.phone}`,
    `${isEs ? "Empresa" : "Company"}: ${contact.company || "—"}`,
    "",
    isEs ? "Respuestas:" : "Answers:",
    ...Object.entries(answers).map(([k, v]) => `  ${k}: ${v}`),
  ];
  return lines.join("\n");
}
