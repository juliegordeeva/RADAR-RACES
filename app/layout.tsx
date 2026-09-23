import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://experience.radarexec.ru"),
  title: {
    default: "Корпоративные приключения и экстремальные выезды — RADAR Experience",
    template: "%s — RADAR Experience",
  },
  description:
    "Организация приключенческих и экстремальных программ для корпоративных команд. Площадки, операторы, логистика и премиальный формат с управленческим разбором.",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://experience.radarexec.ru",
    siteName: "RADAR Experience",
    title: "RADAR Experience",
    description:
      "Корпоративные приключения и экстремальные выезды под ключ. При необходимости — с управленческим разбором.",
  },
  alternates: {
    canonical: "https://experience.radarexec.ru",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${inter.variable} ${outfit.variable}`}>
      <body>{children}</body>
    </html>
  );
}
