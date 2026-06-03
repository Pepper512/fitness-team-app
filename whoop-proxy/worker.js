// Fitness-Team — Whoop OAuth proxy (Cloudflare Worker)
// Holds your Whoop client secret; the app never sees it.
// Stateless: the app stores the (rotating) refresh token on-device and sends it per call.

const WHOOP_AUTH  = "https://api.prod.whoop.com/oauth/oauth2/auth";
const WHOOP_TOKEN = "https://api.prod.whoop.com/oauth/oauth2/token";
const WHOOP_API   = "https://api.prod.whoop.com/developer";
const SCOPES = "offline read:recovery read:sleep read:cycles read:workout read:profile";

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const cors = {
      "Access-Control-Allow-Origin": env.ALLOW_ORIGIN || "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "content-type,authorization",
    };
    if (req.method === "OPTIONS") return new Response(null, { headers: cors });

    const redirectUri = `${url.origin}/auth/callback`;

    // 1) Kick off OAuth — open this in the browser to connect Whoop
    if (url.pathname === "/auth/login") {
      const a = new URL(WHOOP_AUTH);
      a.searchParams.set("response_type", "code");
      a.searchParams.set("client_id", env.WHOOP_CLIENT_ID);
      a.searchParams.set("redirect_uri", redirectUri);
      a.searchParams.set("scope", SCOPES);
      a.searchParams.set("state", crypto.randomUUID());
      return Response.redirect(a.toString(), 302);
    }

    // 2) OAuth callback — exchange code, bounce back to the app with the refresh token
    if (url.pathname === "/auth/callback") {
      const code = url.searchParams.get("code");
      if (!code) return new Response("Missing ?code", { status: 400 });
      const tok = await exchange(env, { grant_type: "authorization_code", code, redirect_uri: redirectUri });
      if (!tok.refresh_token) return new Response("Token error: " + JSON.stringify(tok), { status: 500 });
      const back = `${env.APP_URL}#whoop_rt=${encodeURIComponent(tok.refresh_token)}`;
      return Response.redirect(back, 302);
    }

    // 3) Data — app sends its refresh token; we return today's recovery/sleep/strain
    if (url.pathname === "/whoop/today") {
      const rt = (req.headers.get("authorization") || "").replace("Bearer ", "") || url.searchParams.get("rt");
      if (!rt) return json({ error: "no_refresh_token" }, 401, cors);
      const tok = await exchange(env, { grant_type: "refresh_token", refresh_token: rt, scope: SCOPES });
      if (!tok.access_token) return json({ error: "refresh_failed", detail: tok }, 401, cors);
      const h = { Authorization: `Bearer ${tok.access_token}` };
      const [rec, sleep, cycle, profile] = await Promise.all([
        fetchJson(`${WHOOP_API}/v2/recovery?limit=1`, h),
        fetchJson(`${WHOOP_API}/v2/activity/sleep?limit=1`, h),
        fetchJson(`${WHOOP_API}/v2/cycle?limit=1`, h),
        fetchJson(`${WHOOP_API}/v2/user/profile/basic`, h),
      ]);
      return json({
        recovery: rec?.records?.[0]?.score || null,
        sleep: sleep?.records?.[0]?.score || null,
        strain: cycle?.records?.[0]?.score?.strain ?? null,
        profile: profile || null,
        // Whoop rotates refresh tokens — the app must save this new one
        new_refresh_token: tok.refresh_token || null,
      }, 200, cors);
    }

    return new Response("Fitness-Team Whoop proxy is running.", { headers: cors });
  }
};

async function exchange(env, params) {
  const body = new URLSearchParams({
    client_id: env.WHOOP_CLIENT_ID,
    client_secret: env.WHOOP_CLIENT_SECRET,
    ...params,
  });
  const r = await fetch(WHOOP_TOKEN, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body,
  });
  return r.json().catch(() => ({}));
}
async function fetchJson(u, headers) {
  const r = await fetch(u, { headers });
  return r.ok ? r.json().catch(() => null) : null;
}
function json(obj, status, cors) {
  return new Response(JSON.stringify(obj), { status, headers: { "content-type": "application/json", ...cors } });
}