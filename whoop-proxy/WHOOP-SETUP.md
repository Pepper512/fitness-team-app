# Connect Whoop to Fitness-Team — setup checklist

This deploys a tiny Cloudflare Worker that holds your Whoop secret and feeds today's
**recovery / sleep / strain / HRV** into your coach. ~10 minutes, one time.

## You need
- A **Whoop** account with a membership (the API reads your own data).
- A free **Cloudflare** account.
- Node installed (you already have it).

---

## Step 1 — Create your Whoop developer app
1. Go to **developer.whoop.com** → sign in → **Create App** (in the dashboard / team).
2. Name it `Fitness-Team`.
3. **Scopes:** check `read:recovery`, `read:sleep`, `read:cycles`, `read:workout`, `read:profile`, and `offline`.
4. **Redirect URI:** leave a placeholder for now — you'll paste the real one in Step 3
   (it will be `https://fitness-team-whoop.<your-subdomain>.workers.dev/auth/callback`).
5. Copy your **Client ID** and **Client Secret**.

## Step 2 — Deploy the Worker
From this folder:
```bash
cd whoop-proxy
npx wrangler login            # opens browser, approve once
npx wrangler deploy           # prints your Worker URL
```
Your deployed Worker URL is:
```text
https://fitness-team-whoop.pepper512.workers.dev
```

Then set your secrets (they never touch the app or git):
```bash
npx wrangler secret put WHOOP_CLIENT_ID       # paste Client ID
npx wrangler secret put WHOOP_CLIENT_SECRET   # paste Client Secret
```

## Step 3 — Finish the Whoop redirect URI
Back in the Whoop developer dashboard, set the app's **Redirect URI** to exactly:
```
https://fitness-team-whoop.pepper512.workers.dev/auth/callback
```
(your Worker URL + `/auth/callback`). Save.

## Step 4 — Connect in the app
1. Open the Fitness-Team app → **⚙️ Settings → Whoop**.
2. Paste your **Worker URL** (e.g. `https://fitness-team-whoop.jim.workers.dev`) and tap **Save**.
3. Tap **Connect Whoop** → approve on Whoop's screen → you'll bounce back to the app.
4. Open the **Plan** tab — a **Recovery** card appears, and the coach now factors it in.

---

## How your secret stays safe
- The **Client Secret lives only in the Worker** (Cloudflare secret), never in the app or this repo.
- The app stores only your **refresh token**, on your device, and sends it to *your* Worker.
- Whoop rotates the refresh token each call; the app saves the new one automatically.

If anything looks off, open the Worker URL directly in a browser — it should say
"Fitness-Team Whoop proxy is running."
