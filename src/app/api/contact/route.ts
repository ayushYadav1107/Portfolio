import { z } from "zod";
import { Resend } from "resend";
import { profile } from "@/data/profile";

const schema = z.object({
  name: z.string().trim().min(1, "Please add your name.").max(80),
  email: z.email("That email doesn't look right.").max(120),
  message: z.string().trim().min(10, "Message is a little short.").max(2000),
  company: z.string().max(0).optional(), // honeypot — must stay empty
});

// Small in-memory rate limit: 5 messages per IP per 10 minutes (per server instance).
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > LIMIT;
}

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip)) {
    return Response.json({ error: "Too many messages — please try again in a few minutes." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: parsed.error.issues[0]?.message ?? "Invalid input." }, { status: 400 });
  }
  const { name, email, message, company } = parsed.data;
  if (company) return Response.json({ ok: true }); // silently drop bots

  const apiKey = process.env.RESEND_API_KEY?.trim(); // .trim() guards against stray spaces / Windows line endings in .env
  const to = process.env.CONTACT_TO_EMAIL?.trim() || profile.email;

  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] RESEND_API_KEY not set — message logged instead:\n", { name, email, message });
      return Response.json({ ok: true, dev: true });
    }
    return Response.json({ error: "email sending isn't switched on yet." }, { status: 503 });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL?.trim() || "Portfolio <onboarding@resend.dev>",
    to,
    replyTo: email,
    subject: `Portfolio message from ${name}`,
    text: `${message}\n\n— ${name} <${email}>`,
    html: `<p>${escape(message).replace(/\n/g, "<br>")}</p><p>— ${escape(name)} &lt;${escape(email)}&gt;</p>`,
  });

  if (error) {
    // Shows up in your terminal locally, and under Project → Logs on Vercel.
    console.error("[contact] Resend rejected the email:", JSON.stringify(error), "| to:", to);
    // In development, show Resend's own reason (bad key, unverified recipient, …) right in the form.
    const detail = process.env.NODE_ENV !== "production" ? ` Resend says: ${error.message || error.name || "unknown error"}` : "";
    return Response.json({ error: `the mail provider didn't accept the message.${detail}` }, { status: 502 });
  }
  return Response.json({ ok: true });
}
