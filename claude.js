/**
 * Family Meal Planner — Claude API Proxy
 * ─────────────────────────────────────────────────────────────────
 * This serverless function runs on Vercel's servers.
 * It forwards requests from your app to Anthropic's API,
 * adding your secret API key — which is NEVER sent to the browser.
 *
 * Setup: In Vercel dashboard → Settings → Environment Variables
 *   Add:  ANTHROPIC_API_KEY = sk-ant-xxxxxxxxxxxxxxxxxxxx
 */

export default async function handler(req, res) {
  // Only allow POST requests from your own app
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("ANTHROPIC_API_KEY environment variable is not set");
    return res.status(500).json({
      error: "API key not configured. Add ANTHROPIC_API_KEY to Vercel environment variables."
    });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();

    // Pass through Anthropic's status code
    res.status(response.status).json(data);

  } catch (err) {
    console.error("Proxy error:", err);
    res.status(502).json({ error: "Failed to reach Anthropic API", detail: err.message });
  }
}
