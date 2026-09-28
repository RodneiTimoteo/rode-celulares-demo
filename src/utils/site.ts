const DEVELOPMENT_URL = "http://localhost:3000";
const PRODUCTION_FALLBACK_URL = "https://rodecelulares.example";

function fallbackUrl() {
  return process.env.NODE_ENV === "production"
    ? PRODUCTION_FALLBACK_URL
    : DEVELOPMENT_URL;
}

export function getSiteUrl(): URL {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  try {
    return new URL(configuredUrl || fallbackUrl());
  } catch {
    return new URL(fallbackUrl());
  }
}

export function absoluteUrl(path = "/"): string {
  return new URL(path, getSiteUrl()).toString();
}
