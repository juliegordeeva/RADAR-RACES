export const CTA_EMAIL = "prof@jgordeeva.ru";

export function ctaMailto(subject = "RADAR Experience"): string {
  return `mailto:${CTA_EMAIL}?subject=${encodeURIComponent(subject)}`;
}
