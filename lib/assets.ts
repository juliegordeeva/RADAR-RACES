const isProd = process.env.NODE_ENV === "production";
const repo = "RADAR-RACES";
const prefix = isProd ? `/${repo}` : "";

export function asset(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${prefix}${clean}`;
}
