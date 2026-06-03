# Fitness-Team — Android (PWA) App

A home-screen app version of your Fitness-Team skill: a chat coach (powered by Claude), your offline workout plan with exercise photos, and your age-62 heart-rate zones. It's a **Progressive Web App** — it installs to your phone's home screen with an icon and runs full-screen like a native app, but there's nothing to compile and no app store needed.

---

## What actually gets "loaded onto the phone"

| On the phone | Size | Notes |
|---|---|---|
| The app shell (this folder) | ~1 MB | HTML/CSS/JS — cached for offline |
| 18 exercise photos | ~1 MB | cached, so the Plan tab works with no signal |
| Your conversation history | tiny | stored locally in the browser |
| Your Anthropic API key | tiny | stored **only** in this device's browser storage |
| **The AI model** | **0 MB** | runs in Anthropic's cloud — *not* downloaded |

So: the phone holds a small interface + your data. The "brain" (Claude) is a cloud call, which is why **the chat needs internet** but the **plan works offline**.

---

## Run / preview on your computer first

```bash
cd fitness-team-app
python3 -m http.server 8000
# open http://localhost:8000  in Chrome
```

`localhost` counts as a secure context, so the service worker, offline caching, and the Claude connection all work here for testing.

---

## Put it on your Android phone

A PWA must be served over **HTTPS** to install (phones won't install from a plain file). Easiest free options — pick one:

1. **Netlify Drop (no account needed to try):** go to **app.netlify.com/drop** and drag this `fitness-team-app` folder onto the page. You get an `https://…netlify.app` link in seconds.
2. **Cloudflare Pages / GitHub Pages:** push this folder to a repo and enable Pages.

Then on your Android phone:
1. Open the `https://…` link in **Chrome**.
2. Tap the **⋮ menu → "Add to Home screen" / "Install app."**
3. Open it from your home screen — it runs full-screen with the Fitness-Team icon.
4. First launch: go to **⚙️ Settings**, paste your Anthropic API key, tap **Test connection**, then **Save**.

(iPhone works too: open in Safari → Share → "Add to Home Screen.")

---

## Getting an Anthropic API key

1. Sign in at **console.anthropic.com**.
2. Create an API key (`sk-ant-…`) and add a little credit.
3. Paste it into the app's Settings. Sonnet 4.6 is the default (fast + cheap); Opus 4.8 is available for deeper coaching.

Typical cost is a fraction of a cent per question on Sonnet.

---

## About your key & security (read once)

Your key is stored **only on your device** (browser `localStorage`), is sent **straight to Anthropic**, and is **never in the app's code** or shared with anyone. For a **personal, single-user** app this is the simplest safe setup.

⚠️ If you ever shared this app with other people, you should **not** ship your key this way — instead route requests through a tiny serverless proxy (Cloudflare Worker / Vercel function ~30 lines) that holds the key. Ask and I'll write that version.

---

## Not medical advice
Fitness-Team is a coaching aid, not medical care. Get a doctor's OK before starting harder training at 62+, and stop for any red-flag symptom (chest pain, faintness, dizziness, unusual breathlessness, sharp/radiating pain, numbness/tingling).
