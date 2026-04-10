/**
 * API base URL for fetch calls.
 * - Local dev: defaults to http://localhost:5000 when hostname is localhost.
 * - Production (GitHub Pages): set VITE_API_URL at build time (GitHub Actions secret).
 */
function trimSlash(s) {
  return (s || "").replace(/\/+$/, "");
}

export function getApiBase() {
  const fromEnv = trimSlash(import.meta.env.VITE_API_URL);
  if (fromEnv) return fromEnv;

  if (typeof window !== "undefined") {
    const h = window.location.hostname;
    if (h === "localhost" || h === "127.0.0.1") {
      return "http://localhost:5000";
    }
  }

  return "";
}

/** Full URL for an API path like `/api/auth/login` */
export function apiUrl(path) {
  const base = getApiBase();
  const p = path.startsWith("/") ? path : `/${path}`;
  if (!base) {
    return p;
  }
  return `${base}${p}`;
}

export function isApiBaseConfigured() {
  return Boolean(getApiBase());
}

/** Shown when the live site was built without VITE_API_URL */
export const LIVE_SITE_NEEDS_API =
  "This website needs a public API. Add a GitHub Actions secret named VITE_API_URL with your deployed backend URL (for example https://your-app.onrender.com), then redeploy. For local use, run the server on port 5000 and open the app with npm run dev.";
