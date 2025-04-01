import type { Metadata } from "next";
import "./globals.css";
import { Header, Footer } from "@/components";
import styles from './layout.module.css'
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
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
      <body className={styles.wrapper}>
        <Header />
        <main className={styles.main}>{children}</main>
        <SpeedInsights />
        <Footer />
      </body>
    </html>
  );
}
