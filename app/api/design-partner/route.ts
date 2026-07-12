export const runtime = "nodejs";

const WINDOW_MS = 15 * 60 * 1_000;
const MAX_REQUESTS = 5;
const rateLimit = new Map<string, number[]>();

type Application = {
  name: string;
  email: string;
  company: string;
  companyUrl: string;
  productType: string;
  learnerVolume: string;
  itemBankSize: string;
  timeline: string;
  useCase: string;
  consent: boolean;
  companyFax: string;
  startedAt: number;
};

function text(value: unknown, maximum: number) {
  return typeof value === "string" ? value.trim().slice(0, maximum) : "";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[character]!);
}

function clientKey(request: Request) {
  return request.headers.get("cf-connecting-ip")
    ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    ?? "unknown";
}

function isRateLimited(key: string) {
  const now = Date.now();
  const recent = (rateLimit.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) return true;
  recent.push(now);
  rateLimit.set(key, recent);
  return false;
}

function parseApplication(input: unknown): Application | null {
  if (!input || typeof input !== "object") return null;
  const record = input as Record<string, unknown>;
  const application: Application = {
    name: text(record.name, 100),
    email: text(record.email, 180).toLowerCase(),
    company: text(record.company, 160),
    companyUrl: text(record.companyUrl, 300),
    productType: text(record.productType, 80),
    learnerVolume: text(record.learnerVolume, 80),
    itemBankSize: text(record.itemBankSize, 80),
    timeline: text(record.timeline, 80),
    useCase: text(record.useCase, 2_000),
    consent: record.consent === true,
    companyFax: text(record.companyFax, 200),
    startedAt: typeof record.startedAt === "number" ? record.startedAt : 0,
  };
  if (!application.name || !application.company || !application.productType || application.useCase.length < 30 || !application.consent) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(application.email)) return null;
  return application;
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 25_000) return Response.json({ error: "Request is too large." }, { status: 413 });

  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return Response.json({ error: "Invalid request origin." }, { status: 403 });
  if (isRateLimited(clientKey(request))) return Response.json({ error: "Too many requests. Please try again later." }, { status: 429 });

  let raw: unknown;
  try { raw = await request.json(); } catch { return Response.json({ error: "Invalid request." }, { status: 400 }); }
  const application = parseApplication(raw);
  if (!application) return Response.json({ error: "Please complete all required fields." }, { status: 400 });

  // Honeypot and minimum completion-time checks quietly absorb automated spam.
  if (application.companyFax || Date.now() - application.startedAt < 2_000) return Response.json({ accepted: true }, { status: 202 });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.DESIGN_PARTNER_TO_EMAIL;
  const from = process.env.DESIGN_PARTNER_FROM_EMAIL;
  if (!apiKey || !to || !from) return Response.json({ error: "Applications are temporarily unavailable. Please try again later." }, { status: 503 });

  const rows = [
    ["Name", application.name], ["Email", application.email], ["Company", application.company],
    ["Company URL", application.companyUrl || "Not provided"], ["Product type", application.productType],
    ["Monthly learners", application.learnerVolume || "Not provided"], ["Item bank", application.itemBankSize || "Not provided"],
    ["Pilot timeline", application.timeline || "Not provided"],
  ];
  const html = `<h1>New Adaptive Engine design-partner application</h1>${rows.map(([label, value]) => `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`).join("")}<h2>Use case</h2><p>${escapeHtml(application.useCase).replace(/\n/g, "<br>")}</p>`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], reply_to: application.email, subject: `Design partner application — ${application.company}`, html }),
  });
  if (!response.ok) {
    console.error("Design partner email failed", { status: response.status });
    return Response.json({ error: "We could not send your application. Please try again later." }, { status: 502 });
  }
  return Response.json({ accepted: true }, { status: 202 });
}
