const SUPABASE_URL = (process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "").replace(
  /\/+$/,
  ""
);
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const ANON_KEY = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || SERVICE_KEY;

const serviceHeaders = {
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
  "Content-Type": "application/json",
};

async function readBody(req) {
  let body = req.body;
  if (typeof body === "string") {
    try {
      return JSON.parse(body);
    } catch {
      return null;
    }
  }
  return body && typeof body === "object" ? body : null;
}

async function getCaller(req) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  if (!token) return null;

  const userResponse = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: { apikey: ANON_KEY, Authorization: `Bearer ${token}` },
  });
  if (!userResponse.ok) return null;
  const user = await userResponse.json();
  if (!user?.id) return null;

  const staffResponse = await fetch(
    `${SUPABASE_URL}/rest/v1/staff?select=user_id&user_id=eq.${encodeURIComponent(user.id)}`,
    { headers: serviceHeaders }
  );
  if (!staffResponse.ok) return null;
  const rows = await staffResponse.json();
  if (!Array.isArray(rows) || rows.length === 0) return null;
  return user;
}

async function listAdmins() {
  const staffResponse = await fetch(
    `${SUPABASE_URL}/rest/v1/staff?select=user_id,created_at&order=created_at.asc`,
    { headers: serviceHeaders }
  );
  if (!staffResponse.ok) throw new Error("Could not load the staff list.");
  const staff = await staffResponse.json();

  const usersResponse = await fetch(`${SUPABASE_URL}/auth/v1/admin/users?page=1&per_page=200`, {
    headers: serviceHeaders,
  });
  if (!usersResponse.ok) throw new Error("Could not load staff accounts.");
  const data = await usersResponse.json();
  const users = Array.isArray(data?.users) ? data.users : [];
  const byId = new Map(users.map((user) => [user.id, user]));

  return staff.map((row) => ({
    userId: row.user_id,
    createdAt: row.created_at,
    email: byId.get(row.user_id)?.email ?? "(unknown)",
    lastSignInAt: byId.get(row.user_id)?.last_sign_in_at ?? null,
  }));
}

async function createAdmin(email, password) {
  const response = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
    method: "POST",
    headers: serviceHeaders,
    body: JSON.stringify({ email, password, email_confirm: true }),
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    const message =
      data?.msg || data?.message || data?.error_description || "Could not create the account.";
    throw new Error(message);
  }
  const userId = data?.id;
  if (!userId) throw new Error("Could not create the account.");

  const staffResponse = await fetch(`${SUPABASE_URL}/rest/v1/staff`, {
    method: "POST",
    headers: { ...serviceHeaders, Prefer: "return=minimal" },
    body: JSON.stringify({ user_id: userId }),
  });
  if (!staffResponse.ok) {
    await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${userId}`, {
      method: "DELETE",
      headers: serviceHeaders,
    });
    throw new Error("Could not add the account to the staff list.");
  }
  return { userId };
}

async function removeAdmin(userId, callerId) {
  if (!userId) throw new Error("Missing user id.");
  if (userId === callerId) throw new Error("You cannot remove your own admin access.");

  const countResponse = await fetch(`${SUPABASE_URL}/rest/v1/staff?select=user_id`, {
    headers: serviceHeaders,
  });
  if (!countResponse.ok) throw new Error("Could not load the staff list.");
  const staff = await countResponse.json();
  if (!Array.isArray(staff) || staff.length <= 1) {
    throw new Error("You cannot remove the last admin.");
  }

  const deleteStaff = await fetch(
    `${SUPABASE_URL}/rest/v1/staff?user_id=eq.${encodeURIComponent(userId)}`,
    { method: "DELETE", headers: serviceHeaders }
  );
  if (!deleteStaff.ok) throw new Error("Could not remove admin access.");

  await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${encodeURIComponent(userId)}`, {
    method: "DELETE",
    headers: serviceHeaders,
  });
  return { ok: true };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  if (!SUPABASE_URL || !SERVICE_KEY) {
    res.status(503).json({ error: "Admin API is not configured." });
    return;
  }

  let caller;
  try {
    caller = await getCaller(req);
  } catch {
    caller = null;
  }
  if (!caller) {
    res.status(401).json({ error: "Not authorized." });
    return;
  }

  const body = await readBody(req);
  const action = body?.action;

  try {
    if (action === "list") {
      res.status(200).json({ admins: await listAdmins(), callerId: caller.id });
      return;
    }
    if (action === "create") {
      const email = String(body.email ?? "").trim().toLowerCase();
      const password = String(body.password ?? "");
      if (!email || !email.includes("@")) {
        res.status(400).json({ error: "Enter a valid email address." });
        return;
      }
      if (password.length < 8) {
        res.status(400).json({ error: "Use a password with at least 8 characters." });
        return;
      }
      res.status(200).json(await createAdmin(email, password));
      return;
    }
    if (action === "remove") {
      res.status(200).json(await removeAdmin(String(body.userId ?? ""), caller.id));
      return;
    }
    res.status(400).json({ error: "Unknown action." });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "Request failed." });
  }
}
