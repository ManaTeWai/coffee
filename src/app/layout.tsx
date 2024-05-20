import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "./components";
import styles from './page.module.css'

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <Header />
        <main className={styles.wrapper}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
