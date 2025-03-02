import type { Metadata } from "next";
import "./globals.css";
import { Header, Footer } from "@/components";
import styles from './layout.module.css'

export const metadata: Metadata = {
  title: "Кофе Тайм",
  description: "Coffee to portfolio",
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
        <Footer />
      </body>
    </html>
  );
}
