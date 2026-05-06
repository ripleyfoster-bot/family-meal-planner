# Family Meal Planner — Vercel Deployment Package

## What's in this folder

```
index.html          ← The app (all API calls point to /api/claude)
manifest.json       ← PWA manifest for iPhone "Add to Home Screen"
privacy.html        ← Privacy policy page
vercel.json         ← Vercel routing and security headers
api/
  claude.js         ← Server-side proxy (holds your API key safely)
icons/
  icon-180.png      ← iPhone home screen icon (180×180)
  icon-192.png      ← Android / PWA icon (192×192)
  icon-512.png      ← Large PWA icon (512×512)
```

---

## How to deploy (takes about 20 minutes)

### Step 1 — Create a Vercel account
Go to https://vercel.com and sign up for free (use GitHub or email).

### Step 2 — Install Vercel CLI (optional but easiest)
```bash
npm install -g vercel
```
Or use the Vercel dashboard to drag-and-drop upload.

### Step 3 — Deploy via CLI
```bash
cd family-meal-planner   # this folder
vercel deploy
```
Follow the prompts. When asked "In which directory is your code?" just press Enter.

### Step 3 (alternative) — Deploy via dashboard
1. Go to https://vercel.com/new
2. Choose "Deploy without Git" → drag this entire folder in
3. Click Deploy

### Step 4 — Add your Anthropic API key (CRITICAL)
1. In Vercel dashboard, open your project
2. Go to Settings → Environment Variables
3. Add a new variable:
   - Name:  `ANTHROPIC_API_KEY`
   - Value: `sk-ant-api03-xxxxxxxxxxxxxxxx` (your key from console.anthropic.com)
   - Environment: Production, Preview, Development (tick all)
4. Click Save
5. Go to Deployments → click the three dots on your latest deployment → Redeploy

### Step 5 — Test it
Visit your deployment URL (e.g. https://family-meal-planner.vercel.app)
The app should load and Claude suggestions should work.

### Step 6 — Add to iPhone home screen
1. Open the URL in Safari on iPhone
2. Tap the Share button (box with arrow)
3. Scroll down → tap "Add to Home Screen"
4. Name it "Meal Planner" → tap Add
5. It now runs fullscreen like a native app

---

## Custom domain (optional)
In Vercel → Settings → Domains → add your own domain (e.g. mealplanner.yourdomain.com)
Vercel handles SSL automatically.

---

## Replacing the icons
The included icons are functional placeholders. To replace them:
1. Create your icon images at exactly 512×512, 192×192, and 180×180 pixels (PNG)
2. Replace the files in the `icons/` folder
3. Redeploy

Good free tools: Canva, Figma, or https://favicon.io

---

## Costs
- Vercel free tier: 100GB bandwidth/month, unlimited deployments — more than enough
- Anthropic API: pay-per-use, typically pennies per session for a family
- Custom domain: ~£10/year (optional)

---

## Security notes
- Your API key is stored in Vercel's encrypted environment variables, never in the code
- The proxy (api/claude.js) only accepts POST requests
- Security headers (X-Frame-Options, etc.) are set in vercel.json
- All user data is stored in the browser's localStorage — nothing is stored on your server

---

## Support
If the app shows "Could not reach Claude", check:
1. ANTHROPIC_API_KEY is set in Vercel environment variables
2. You redeployed after adding the key
3. Your Anthropic account has credit at console.anthropic.com
