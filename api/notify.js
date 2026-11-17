const RESEND_ENDPOINT = "https://api.resend.com/emails";
const KINDS = new Set(["contact", "involvement", "registration", "subscriber"]);

const escapeHtml = (value) =>
  String(value ?? "").replace(/[&<>"']/g, (char) => {
    const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
    return map[char];
  });

const clean = (value, max = 2000) => String(value ?? "").trim().slice(0, max);

const row = (label, value) =>
  value
    ? `<tr><td style="padding:4px 12px 4px 0;color:#6b6b6b;vertical-align:top">${escapeHtml(
        label
      )}</td><td style="padding:4px 0">${escapeHtml(value)}</td></tr>`
    : "";

const block = (label, value) =>
  value
    ? `<p style="margin:16px 0 4px;font-weight:bold">${escapeHtml(
        label
      )}</p><p style="margin:0;padding:12px;background:#f5f3ee;border-radius:8px;white-space:pre-wrap">${escapeHtml(
        value
      )}</p>`
    : "";

const wrap = (title, rows, extra = "") =>
  `<div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#111"><h2 style="margin:0 0 12px">${escapeHtml(
    title
  )}</h2><table cellpadding="0" cellspacing="0" style="border-collapse:collapse">${rows}</table>${extra}<p style="margin-top:20px;color:#777;font-size:13px">Sent from the Selftech DigiCommunity website.</p></div>`;

function buildEmail(payload) {
  if (payload.kind === "contact") {
    const name = clean(payload.name, 200);
    const email = clean(payload.email, 320);
    const topic = clean(payload.topic, 120);
    const subject = clean(payload.subject, 200);
    const message = clean(payload.message);
    return {
      subject: `New contact message: ${subject || name || "website enquiry"}`,
      replyTo: email,
      html: wrap(
        "New contact message",
        row("Name", name) + row("Email", email) + row("Topic", topic) + row("Subject", subject),
        block("Message", message)
      ),
    };
  }

  if (payload.kind === "involvement") {
    const name = clean(payload.name, 200);
    const type = clean(payload.type, 120);
    const email = clean(payload.email, 320);
    const organization = clean(payload.organization, 200);
    const phone = clean(payload.phone, 60);
    const message = clean(payload.message);
    return {
      subject: `New ${type || "involvement"} request: ${name || "website visitor"}`,
      replyTo: email,
      html: wrap(
        "New volunteer or partner request",
        row("Name", name) +
          row("Type", type) +
          row("Organization", organization) +
          row("Email", email) +
          row("Phone", phone),
        block("Message", message)
      ),
    };
  }

  if (payload.kind === "registration") {
    const name = clean(payload.name, 200);
    const email = clean(payload.email, 320);
    const reference = clean(payload.reference, 40);
    const phone = clean(payload.phone, 60);
    const program = clean(payload.program, 200);
    const format = clean(payload.format, 80);
    const experience = clean(payload.experience, 80);
    const location = clean(payload.location, 200);
    const motivation = clean(payload.motivation);
    return {
      subject: `New registration ${reference}: ${name || "website visitor"}`,
      replyTo: email,
      html: wrap(
        "New program registration",
        row("Reference", reference) +
          row("Name", name) +
          row("Email", email) +
          row("Phone", phone) +
          row("Program", program) +
          row("Format", format) +
          row("Experience", experience) +
          row("Location", location),
        block("Motivation", motivation)
      ),
    };
  }

  const email = clean(payload.email, 320);
  return {
    subject: "New newsletter subscriber",
    replyTo: email,
    html: wrap("New newsletter subscriber", row("Email", email)),
  };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  let payload = req.body;
  if (typeof payload === "string") {
    try {
      payload = JSON.parse(payload);
    } catch {
      payload = null;
    }
  }
  if (!payload || typeof payload !== "object" || !KINDS.has(payload.kind)) {
    res.status(400).json({ error: "Invalid payload" });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL;
  const from = process.env.RESEND_FROM || "Selftech DigiCommunity <onboarding@resend.dev>";

  if (!apiKey || !to) {
    res.status(200).json({ skipped: true });
    return;
  }

  const email = buildEmail(payload);

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: email.subject,
        html: email.html,
        ...(email.replyTo ? { reply_to: email.replyTo } : {}),
      }),
    });
    if (!response.ok) {
      const detail = await response.text();
      console.error("Resend rejected the email", response.status, detail);
      res.status(502).json({ error: "Email send failed" });
      return;
    }
    res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Email send failed", error);
    res.status(502).json({ error: "Email send failed" });
  }
}
