import type { Metadata } from "next";
import "./globals.css";
import { Header, Footer } from "@/components";
import styles from "./layout.module.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.coffee-time.online/"),
  authors: [{ name: "ManaTeWai", url: "https://t.me/manatewai" }],
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    siteName: "Coffee Time",
    images: "/og-default.jpg",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@coffeetime",
    creator: "@coffeetime",
  },
  title: "Кофе Тайм",
  description: "Coffee to portfolio",
  other: {
    "yandex-verification": "72e1624e4db0db19",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={styles.wrapper}>
        <Header />
        <main className={styles.main}>{children}</main>
        <SpeedInsights />
        <Footer />
      </body>
    </html>
  );
}
